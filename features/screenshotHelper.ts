import fs from 'fs-extra';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import { join } from 'path';
import { addAttachment } from '@wdio/allure-reporter';

const BASELINE_DIR = join(process.cwd(), 'baseline');
const SCREENSHOT_DIR = join(process.cwd(), 'screenshots');

export default async function compareScreenshot(tag: string) {
    await fs.ensureDir(BASELINE_DIR);
    await fs.ensureDir(SCREENSHOT_DIR);

    const screenshotPath = join(SCREENSHOT_DIR, `${tag}.png`);
    await driver.saveScreenshot(screenshotPath);

    // Attach current screenshot to Allure
    addAttachment(`${tag}-current`, fs.readFileSync(screenshotPath), 'image/png');

    const baselinePath = join(BASELINE_DIR, `${tag}.png`);
    if (!fs.existsSync(baselinePath)) {
        await fs.copy(screenshotPath, baselinePath);
        console.log(`[Visual] Baseline created for ${tag}`);
        addAttachment(`${tag}-baseline`, fs.readFileSync(baselinePath), 'image/png');
        return;
    }

    const img1 = PNG.sync.read(fs.readFileSync(screenshotPath));
    const img2 = PNG.sync.read(fs.readFileSync(baselinePath));
    const { width, height } = img1;
    const diff = new PNG({ width, height });

    const mismatch = pixelmatch(img1.data, img2.data, diff.data, width, height, { threshold: 0.1 });

    if (mismatch > 0) {
        const diffPath = join(SCREENSHOT_DIR, `${tag}_diff.png`);
        fs.writeFileSync(diffPath, PNG.sync.write(diff));

        // Attach baseline + diff images to Allure
        addAttachment(`${tag}-baseline`, fs.readFileSync(baselinePath), 'image/png');
        addAttachment(`${tag}-diff`, fs.readFileSync(diffPath), 'image/png');

        throw new Error(`[Visual] Screenshot mismatch for ${tag}: ${mismatch} pixels differ. See diff attached in Allure`);
    } else {
        console.log(`[Visual] Screenshot matched for ${tag}`);
    }
}
