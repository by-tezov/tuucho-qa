// Helper functions
fun logSuccess(text: String) {
    println("\u001B[32m$text\u001B[0m")
}

fun logInfo(text: String) {
    println("\u001B[34m$text\u001B[0m")
}

fun logWarning(text: String) {
    println("\u001B[33m$text\u001B[0m")
}

// Generic tasks
tasks.register<Exec>("code.prettier") {
    description = "Code prettier"
    group = "_system"
    doFirst {
        commandLine("npm", "run", "prettier")
    }
}

tasks.register<Exec>("npm.install") {
    description = "Install npm"
    group = "_node"
    doFirst {
        commandLine("sh", "-c", "npm ci")
    }
}

// ./gradlew test -Planguage="" -Pplatform="android" -PbuildType="" -PflavorType="" -PdeviceName="Pixel_7_pro_API_35" -PdeviceSdkVersion="35" -PappVersion="" -PappPath="/home/tezov/Local/tuucho" -PappFile="android-debug.apk"

tasks.register<Exec>("test") {
    description = "test"
    group = "_test"
    doFirst {
        val language = project.findProperty("language") as String
        val platform = project.findProperty("platform") as String
        val buildType = project.findProperty("buildType") as String
        val flavorType = project.findProperty("flavorType") as String
        val deviceName = project.findProperty("deviceName") as String
        val hash = project.findProperty("hash") as String
        logInfo("test:: language: $language, platform:$platform, buildType:$buildType, flavorType:$flavorType, deviceName: $deviceName, hash: $hash")

        val appPath = project.findProperty("appPath") as String
        val appFile = project.findProperty("appFile") as String
        logInfo("test:: appPath: $appPath, appFile: $appFile")

        val tags = project.findProperty("tags") as String?
        logInfo("test:: tags: $tags")

        environment("PLATFORM", platform)
        environment("LANGUAGE", language)
        environment("BUILD_TYPE", buildType)
        environment("FLAVOR_TYPE", flavorType)
        environment("DEVICE_NAME", deviceName)
        environment("VISUAL_TESTING_HASH", hash)
        environment("APP_PATH", "$appPath/$appFile")
        if (tags != null) {
            environment("TAGS", "--verbose --grep $tags")
        }
        commandLine("npm", "run", "test")
    }
}

tasks.register<Exec>("allure.generate") {
    description = "Allure generate"
    group = "_report"
    doFirst {
        commandLine("npm", "run", "allure:generate")
    }
}

// IOS
fun getAvailableDevices(): Map<String, List<String>> {
    val command = ProcessBuilder("xcrun", "simctl", "list", "devices")
        .start()
        .inputStream
        .bufferedReader()

    val deviceSections = mutableMapOf<String, MutableList<String>>()
    var currentSectionName = ""
    var currentSectionDevices = mutableListOf<String>()
    var includeSection = true

    command.forEachLine { line ->
        if (line.startsWith("--")) {
            if (includeSection && currentSectionName.isNotEmpty()) {
                deviceSections[currentSectionName] = currentSectionDevices
            }
            currentSectionName = line.replace("--", "")
                .trim()
                .lowercase()
                .replace(" ", "-")
            currentSectionDevices = mutableListOf()
            includeSection = !line.contains("Unavailable")
        } else if (includeSection && line.isNotBlank()) {
            currentSectionDevices.add(line.trim())
        }
    }

    if (includeSection && currentSectionName.isNotEmpty()) {
        deviceSections[currentSectionName] = currentSectionDevices
    }

    return deviceSections
}

fun getSimulatorId(device: String, devices: Map<String, List<String>>? = null): String? {
    val _devices = devices ?: getAvailableDevices()
    val deviceId = _devices.values.flatten()
        .find { it.contains(device) }
        ?.replace(Regex(".*\\(([0-9A-Fa-f-]+)\\).*"), "$1")
    return deviceId
}

fun createSimulator(deviceName: String, devices: Map<String, List<String>>? = null): String {
    var deviceId = getSimulatorId(deviceName, devices)
    if (deviceId == null) {
        val model: String
        val core: String
        when(deviceName) {
            "iphone_16-18.5-simulator" -> {
                model = "iPhone 16"
                core = "com.apple.CoreSimulator.SimRuntime.iOS-18-5"
            }
            else -> throw GradleException("invalid device name $deviceName")
        } 

        deviceId = ProcessBuilder("xcrun", "simctl", "create", deviceName, model, core) 
            .start().inputStream.bufferedReader().readText().trim()
    }
    return deviceId
}

tasks.register("appium.start") {
    description = "Appium start"
    group = "_appium"
    doFirst {
        ProcessBuilder("sh", "-c", "BUILD_ID=dontKillMe nohup appium --allow-cors > appium.log 2>&1 &").start()

        val maxRetries = 10
        var retries = 0
        var ready = false
        while (!ready && retries < maxRetries) {
            try {
                val conn = java.net.URL("http://localhost:4723/status").openConnection()
                conn.connectTimeout = 2000
                conn.readTimeout = 2000
                if ((conn as java.net.HttpURLConnection).responseCode == 200) {
                    ready = true
                    break
                }
            } catch (_: Exception) { }
            Thread.sleep(2000)
            retries++
        }
        if (!ready) {
            throw GradleException("Appium did not start within timeout")
        }
    }
}

tasks.register<Exec>("appium.stop") {
    description = "Appium stop"
    group = "_appium"
    doFirst {
        commandLine("sh", "-c", "lsof -ti :4723 | xargs kill -9 || true")
    }
}

tasks.register("simulator.start") {
    description = "Simulator start"
    group = "_simulator"
    
    doLast {
        val deviceName = project.findProperty("deviceName") as String
        logInfo("simulator.start:: deviceName:$deviceName")

        val deviceId = createSimulator(deviceName)
        ProcessBuilder("xcrun", "simctl", "boot", deviceId).start().waitFor()
        ProcessBuilder("open", "-a", "Simulator").start().waitFor()
        ProcessBuilder("xcrun", "simctl", "bootstatus", deviceId, "-b").start().waitFor()
    }
}

tasks.register("simulator.stop") {
    description = "Simulator stop"
    group = "_simulator"
    doFirst {
        val deviceName = project.findProperty("deviceName") as String
        logInfo("simulator.stop:: deviceName:$deviceName")

        val deviceId = getSimulatorId(deviceName)
        if (deviceId != null) {
            ProcessBuilder("xcrun", "simctl", "shutdown", deviceId).start().waitFor()
            var stopped = false
            repeat(30) {
                val status = ProcessBuilder("xcrun", "simctl", "list", "devices", "booted")
                    .start().inputStream.bufferedReader().readText().trim()
                if (!status.contains(deviceId)) {
                    stopped = true
                    return@repeat
                }
                Thread.sleep(2000)
            }
            if (stopped) {
                ProcessBuilder("xcrun", "simctl", "delete", deviceId).start().waitFor()
            }
            else {
                try {
                    Runtime.getRuntime().exec("xcrun simctl spawn $deviceId kill 0").waitFor()
                } catch (_: Exception) {}
            }
        }
    }
}

/* END REGION */
