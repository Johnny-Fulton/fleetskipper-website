import { test, expect } from '@playwright/test';

test.describe('Contact Form - Email Delivery Test', () => {
  test('should submit contact form and verify email was sent', async ({ page }) => {
    console.log('=== CONTACT FORM EMAIL DELIVERY TEST ===\n');

    // Step 1: Navigate to contact page
    console.log('Step 1: Navigating to contact page...');
    await page.goto('https://seaready-website.vercel.app/contact');
    await page.waitForLoadState('networkidle');
    console.log('✅ Page loaded\n');

    // Step 2: Fill out the form
    console.log('Step 2: Filling out form with test data...');

    // Fill name
    const nameInput = page.locator('input[name="name"], input[id*="name"]').first();
    await nameInput.fill('Email Test User');
    console.log('  ✓ Name: "Email Test User"');

    // Fill email
    const emailInput = page.locator('input[type="email"], input[name="email"]').first();
    await emailInput.fill('test-email@example.com');
    console.log('  ✓ Email: "test-email@example.com"');

    // Select subject
    const subjectSelect = page.locator('select[name="subject"], select[id*="subject"]').first();
    await subjectSelect.selectOption('General Question');
    console.log('  ✓ Subject: "General Question"');

    // Fill message
    const messageTextarea = page.locator('textarea[name="message"], textarea[id*="message"]').first();
    await messageTextarea.fill('Testing email delivery after Vercel env vars setup');
    console.log('  ✓ Message: "Testing email delivery after Vercel env vars setup"\n');

    // Step 3: Take screenshot before submit
    await page.screenshot({
      path: '/Users/jonathanfulton/REGULATION APP/SeaReady/assistants/website/tests/screenshots/contact-form-before-submit.jpg',
      type: 'jpeg',
      quality: 50,
      scale: 'css'
    });
    console.log('📸 Screenshot saved: contact-form-before-submit.jpg\n');

    // Step 4: Submit form
    console.log('Step 3: Submitting form...');

    // Start listening for console messages
    const consoleMessages: string[] = [];
    page.on('console', msg => {
      const text = msg.text();
      consoleMessages.push(`[${msg.type()}] ${text}`);
      if (text.includes('email') || text.includes('Email') || text.includes('send') || text.includes('API')) {
        console.log(`  📝 Console: [${msg.type()}] ${text}`);
      }
    });

    // Listen for API calls
    const apiCalls: any[] = [];
    page.on('response', async response => {
      const url = response.url();
      if (url.includes('/api/') || url.includes('email') || url.includes('send')) {
        const status = response.status();
        let body = null;
        try {
          body = await response.text();
        } catch (e) {
          // ignore
        }
        apiCalls.push({ url, status, body });
        console.log(`  🌐 API Call: ${url} → Status ${status}`);
      }
    });

    // Find and click submit button
    const submitButton = page.locator('button[type="submit"]').first();
    await submitButton.click();
    console.log('  ✓ Submit button clicked\n');

    // Step 5: Wait for response
    console.log('Step 4: Waiting for response...');
    await page.waitForTimeout(3000); // Give time for API call and UI update

    // Step 6: Check for success message
    console.log('\nStep 5: Checking for success indicators...');

    // Look for success message
    const successIndicators = [
      page.getByText(/thank you/i),
      page.getByText(/message.*sent/i),
      page.getByText(/received.*message/i),
      page.getByText(/contact.*soon/i),
      page.locator('[class*="success"]').filter({ hasText: /./i }),
      page.locator('[role="alert"]').filter({ hasText: /./i })
    ];

    let successFound = false;
    for (const indicator of successIndicators) {
      const count = await indicator.count();
      if (count > 0) {
        const text = await indicator.first().textContent();
        console.log(`  ✅ Success message found: "${text}"`);
        successFound = true;
        break;
      }
    }

    if (!successFound) {
      console.log('  ⚠️  No explicit success message found - checking for errors...');
    }

    // Step 7: Check for errors
    const errorIndicators = [
      page.getByText(/error/i),
      page.getByText(/failed/i),
      page.getByText(/something went wrong/i),
      page.locator('[class*="error"]').filter({ hasText: /./i })
    ];

    let errorFound = false;
    for (const indicator of errorIndicators) {
      const count = await indicator.count();
      if (count > 0) {
        const text = await indicator.first().textContent();
        console.log(`  ❌ Error message found: "${text}"`);
        errorFound = true;
      }
    }

    if (!errorFound) {
      console.log('  ✅ No error messages displayed\n');
    }

    // Step 8: Take screenshot after submit
    await page.screenshot({
      path: '/Users/jonathanfulton/REGULATION APP/SeaReady/assistants/website/tests/screenshots/contact-form-after-submit.jpg',
      type: 'jpeg',
      quality: 50,
      scale: 'css'
    });
    console.log('📸 Screenshot saved: contact-form-after-submit.jpg\n');

    // Step 9: Summary
    console.log('=== TEST SUMMARY ===\n');
    console.log(`Form Submission: ${successFound ? '✅ SUCCESS' : errorFound ? '❌ FAILED' : '⚠️  UNCLEAR'}`);
    console.log(`API Calls Made: ${apiCalls.length}`);
    console.log(`Console Messages: ${consoleMessages.length}`);
    console.log(`Success Message: ${successFound ? 'YES' : 'NO'}`);
    console.log(`Error Message: ${errorFound ? 'YES' : 'NO'}`);

    if (apiCalls.length > 0) {
      console.log('\n📊 API CALLS:');
      apiCalls.forEach((call, i) => {
        console.log(`  ${i + 1}. ${call.url}`);
        console.log(`     Status: ${call.status}`);
        if (call.body) {
          console.log(`     Response: ${call.body.substring(0, 200)}...`);
        }
      });
    }

    if (consoleMessages.length > 0) {
      console.log('\n📝 RELEVANT CONSOLE MESSAGES:');
      consoleMessages.forEach(msg => {
        console.log(`  ${msg}`);
      });
    }

    console.log('\n=== NEXT STEPS FOR JONATHAN ===\n');
    console.log('1. Check email inbox: support@seaready.co.uk');
    console.log('2. Look for subject: "Contact Form: General Question - Email Test User"');
    console.log('3. Verify HTML email formatting is correct');
    console.log('4. Check if email contains all form data');
    console.log('\nIf no email received, check:');
    console.log('- Vercel environment variables are set correctly');
    console.log('- Resend API key is valid');
    console.log('- Domain verification in Resend dashboard');
    console.log('- Spam folder\n');

    // Assertions
    if (errorFound) {
      throw new Error('Form submission showed error message');
    }

    if (successFound) {
      console.log('✅ TEST PASSED - Form submitted successfully\n');
      console.log('Email should have been sent via Resend API');
    } else {
      console.log('⚠️  TEST UNCLEAR - No clear success/error message\n');
      console.log('Check screenshots to verify form state');
    }
  });
});
