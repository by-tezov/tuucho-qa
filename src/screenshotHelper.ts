import fs from 'fs-extra';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import { join } from 'path';
import { addAttachment, addStep, addDescription } from '@wdio/allure-reporter';
import { visualTestingPaths } from '../wdio.conf.ts';

const BASELINE_DIR = visualTestingPaths.baselineDir;
const SCREENSHOT_DIR = visualTestingPaths.screenshotDir;

export default async function compareScreenshot(tag: string) {
	await fs.ensureDir(BASELINE_DIR);
	await fs.ensureDir(SCREENSHOT_DIR);

	const screenshotPath = join(SCREENSHOT_DIR, `${tag}.png`);
	await driver.saveScreenshot(screenshotPath);

	const baselinePath = join(BASELINE_DIR, `${tag}.png`);
	if (!fs.existsSync(baselinePath)) {
		await fs.copy(screenshotPath, baselinePath);
		addAttachment(`${tag}-baseline`, fs.readFileSync(baselinePath), 'image/png');
		return;
	}

	const img1 = PNG.sync.read(fs.readFileSync(screenshotPath));
	const img2 = PNG.sync.read(fs.readFileSync(baselinePath));
	const { width, height } = img1;
	const diff = new PNG({ width, height });
	const mismatchPixel = pixelmatch(img1.data, img2.data, diff.data, width, height, { threshold: 0.1 });
	const mismatchPercent = ((mismatchPixel / (width * height)) * 100).toFixed(2);

	addAttachment(`${tag}-baseline`, fs.readFileSync(baselinePath), 'image/png');
	addAttachment(`${tag}-current`, fs.readFileSync(screenshotPath), 'image/png');
	const diffPath = join(SCREENSHOT_DIR, `${tag}_diff.png`);
	fs.writeFileSync(diffPath, PNG.sync.write(diff));
	addAttachment(`${tag}-diff`, fs.readFileSync(diffPath), 'image/png');
	addDescription(`Mismatch:\n- pixels: ${mismatchPixel}\n- percent: ${mismatchPercent}`);
	if (mismatchPercent > 0.05) {
		addStep(`over 0.05% mismatch limit acceptance`, {}, 'failed');
	} else {
		addStep(`below 0.05% mismatch limit acceptance`, {}, 'passed');
	}
}
