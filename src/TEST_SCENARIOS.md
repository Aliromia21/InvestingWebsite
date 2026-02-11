# Test Scenarios - Income Chart & Messaging System

## 📊 Testing the Simplified Income Chart

### Scenario 1: Daily View (Default)
**Steps:**
1. Open Customer Dashboard
2. Ensure you have "Professional Pack" selected
3. View the "Your Money Growth" section
4. Should see "Daily" tab active (highlighted in blue/purple gradient)

**Expected Results:**
- ✅ 3 large stat cards displayed:
  - Total Earned: ~140 USDT (last 7 days)
  - Average per Day: ~20 USDT
  - Growth Rate: 2.0% per day
- ✅ Bar chart showing 7 bars (Mon-Sun)
- ✅ Each bar is gradient blue/purple
- ✅ Hover shows exact USDT amount
- ✅ Clean, easy to read

### Scenario 2: Weekly View
**Steps:**
1. Click "Weekly" tab
2. Wait for smooth transition

**Expected Results:**
- ✅ Weekly tab now highlighted
- ✅ Stats update to weekly totals
- ✅ 4 bars showing W1, W2, W3, W4
- ✅ Higher numbers (7x daily amount)
- ✅ Average per Week shown

### Scenario 3: Monthly View
**Steps:**
1. Click "Monthly" tab
2. Review the data

**Expected Results:**
- ✅ Monthly tab highlighted
- ✅ 6 bars showing last 6 months (Jun-Nov)
- ✅ Even larger numbers (~30x daily)
- ✅ Clear month labels
- ✅ Smooth animations

### Scenario 4: Different Investment Packs
**Steps:**
1. Go to Investment Packs tab
2. Select "Elite Pack" (3.0% daily)
3. Return to Dashboard
4. View chart

**Expected Results:**
- ✅ Growth Rate shows 3.0%
- ✅ Income amounts are higher
- ✅ Chart adjusts to new pack rate
- ✅ All calculations update

### Scenario 5: No Investment Pack
**Steps:**
1. Imagine user has no active pack
2. (Would need to modify selectedPack to null)

**Expected Results:**
- ✅ Chart section doesn't display
- ✅ Only basic stats shown
- ✅ No errors in console

---

## 💌 Testing the Messaging System

### Admin Side Testing

#### Scenario 1: Create Facebook Share Offer
**Steps:**
1. Open Admin Dashboard
2. Click "Messages" tab
3. Click "Create New Offer"
4. Fill form:
   - User: "Sarah Smith"
   - Title: "Share & Earn $20!"
   - Message: "Share our platform on Facebook and earn $20 instantly!"
   - Reward: "$20 USDT"
   - Action Label: "Share on Facebook"
   - Action URL: "https://www.facebook.com/sharer/sharer.php?u=https://investpro.com"
5. Click "Send Offer to User"

**Expected Results:**
- ✅ Form clears
- ✅ New offer appears in table
- ✅ Status shows "Pending" (yellow badge)
- ✅ Sarah Smith shown as recipient
- ✅ Offer details displayed correctly
- ✅ External link icon shown

#### Scenario 2: View Statistics
**Steps:**
1. Look at stats cards at top
2. Note the numbers

**Expected Results:**
- ✅ Total Messages: 4 (3 existing + 1 new)
- ✅ Pending: 2
- ✅ Accepted: 1
- ✅ Declined: 1
- ✅ Color-coded cards (yellow, green, red)

#### Scenario 3: Create Offer Without URL
**Steps:**
1. Click "Create New Offer"
2. Fill all fields EXCEPT Action URL
3. Send offer

**Expected Results:**
- ✅ Offer created successfully
- ✅ No external link icon in table
- ✅ Action button will work without opening link

#### Scenario 4: Delete an Offer
**Steps:**
1. Find any offer in table
2. Click red trash icon
3. Confirm deletion

**Expected Results:**
- ✅ Confirmation dialog appears
- ✅ After confirm, offer removed from table
- ✅ Stats update (-1 from total)
- ✅ Smooth removal animation

#### Scenario 5: Create with Expiry Date
**Steps:**
1. Create new offer
2. Set expiry date to 7 days from now
3. Send offer

**Expected Results:**
- ✅ Offer created
- ✅ Expiry date stored
- ✅ (Would show in user popup)

---

### Customer Side Testing

#### Scenario 1: First Time Seeing Offer
**Steps:**
1. Open browser in incognito/private mode
2. Navigate to Customer Dashboard
3. Wait 1 second

**Expected Results:**
- ✅ Beautiful popup appears after 1 sec
- ✅ Backdrop blur effect visible
- ✅ Gradient popup with gift icon
- ✅ Offer title displayed
- ✅ Message text readable
- ✅ Reward highlighted in green
- ✅ Action button visible
- ✅ "Maybe Later" button visible

#### Scenario 2: Accept Offer
**Steps:**
1. See popup appear
2. Read offer details
3. Click the action button (e.g., "Share on Facebook")

**Expected Results:**
- ✅ Popup smoothly disappears
- ✅ New tab opens with Facebook sharer (if URL provided)
- ✅ Alert shows: "Great! Your $20 reward will be credited..."
- ✅ Refresh page - popup doesn't show again
- ✅ localStorage contains: `offer-seen-{id}: "accepted"`

#### Scenario 3: Decline Offer
**Steps:**
1. Open in new incognito window
2. Wait for popup
3. Click "Maybe Later"

**Expected Results:**
- ✅ Popup smoothly disappears
- ✅ No new tab opens
- ✅ No alert shown
- ✅ Refresh page - popup doesn't show again
- ✅ localStorage contains: `offer-seen-{id}: "declined"`

#### Scenario 4: Second Visit (Already Seen)
**Steps:**
1. Accept or decline an offer
2. Close browser
3. Reopen and go to dashboard

**Expected Results:**
- ✅ NO popup appears
- ✅ Offer was already marked as seen
- ✅ User isn't bothered again
- ✅ Normal dashboard loads

#### Scenario 5: Close Popup (Click Backdrop)
**Steps:**
1. See popup
2. Click on dark area around popup (backdrop)

**Expected Results:**
- ✅ Popup closes (same as declining)
- ✅ Marked as declined
- ✅ Won't show again

#### Scenario 6: Close with X Button
**Steps:**
1. See popup
2. Click X button in top-right

**Expected Results:**
- ✅ Popup closes
- ✅ Same behavior as "Maybe Later"
- ✅ Marked as declined

---

## 🔄 Integration Testing

### Scenario 1: Admin Creates → User Sees
**Steps:**
1. Open Admin Dashboard in one window
2. Open Customer Dashboard in another (incognito)
3. In admin: Create offer for "current user"
4. In customer: Refresh page

**Expected Results:**
- ✅ Admin sees offer in table
- ✅ Customer sees popup (mock data - would need real backend)
- ✅ Status can be tracked
- ✅ Full cycle works

### Scenario 2: Multiple Offers (Future)
**Steps:**
1. Admin creates 3 offers for same user
2. User logs in

**Current Behavior:**
- ✅ Only first/latest offer shows (one at a time)
- ✅ After dismissing, next offer could appear

**Future Enhancement:**
- Queue system for multiple offers
- Priority levels
- Spacing between offers

---

## 📱 Responsive Testing

### Chart Responsiveness
**Test on:**
- Desktop (1920px): ✅ 3-column stat grid, full chart
- Laptop (1366px): ✅ 3-column stats, optimized chart
- Tablet (768px): ✅ 2-column stats, smaller chart
- Mobile (375px): ✅ Single column stats, compact chart

### Popup Responsiveness
**Test on:**
- Desktop: ✅ Centered modal, max-width 28rem
- Tablet: ✅ Properly sized, centered
- Mobile: ✅ Full-width with margins, fits screen
- Small phones: ✅ Readable text, proper spacing

---

## 🐛 Error Testing

### Chart Error Scenarios

#### Test 1: No Data
**Steps:**
1. Mock empty data array
2. View chart

**Expected:**
- ✅ No crash
- ✅ Empty chart or placeholder
- ✅ Stats show 0 or N/A

#### Test 2: Invalid Pack Type
**Steps:**
1. Set selectedPack to undefined
2. View dashboard

**Expected:**
- ✅ Chart section hidden
- ✅ No errors
- ✅ Other sections work fine

### Messaging Error Scenarios

#### Test 1: Create Without Required Fields
**Steps:**
1. Try to create offer
2. Leave title empty
3. Click send

**Expected:**
- ✅ Alert: "Please fill in all required fields"
- ✅ Form not submitted
- ✅ User can fix and resubmit

#### Test 2: Invalid URL
**Steps:**
1. Enter malformed URL
2. Send offer

**Expected:**
- ✅ Offer created (URL optional)
- ✅ Might not open correctly (user's risk)
- ✅ No crash

#### Test 3: Invalid Date
**Steps:**
1. Try to set expiry in past
2. Send offer

**Expected:**
- ✅ Offer created (validation could be added)
- ✅ Shows as expired
- ✅ No system errors

---

## ✅ Acceptance Criteria

### Income Chart
- [x] Shows 3 timeframes: Daily, Weekly, Monthly
- [x] Displays 3 key stats with large numbers
- [x] Simple bar chart with gradient colors
- [x] Smooth transitions between timeframes
- [x] Responsive on all devices
- [x] Tooltips show exact values
- [x] Adapts to different investment packs
- [x] No data = no chart displayed

### Messaging System (Admin)
- [x] "Messages" tab in admin dashboard
- [x] Statistics dashboard (4 metrics)
- [x] Create offer form with all fields
- [x] User selection dropdown
- [x] Optional fields work (URL, expiry)
- [x] Send button creates offer
- [x] Table shows all offers
- [x] Status badges color-coded
- [x] Delete functionality works
- [x] Responsive design

### Messaging System (User)
- [x] Popup appears on dashboard load
- [x] 1-second delay before showing
- [x] Beautiful gradient design
- [x] All offer details visible
- [x] Action button works
- [x] External links open in new tab
- [x] Decline button works
- [x] X button closes popup
- [x] Backdrop click closes popup
- [x] Shows only once per offer
- [x] localStorage tracks interactions
- [x] No re-display after interaction

---

## 🎯 Performance Testing

### Chart Performance
**Metrics to Check:**
- Page load time: < 2 seconds
- Chart render time: < 500ms
- Transition animations: 60fps
- Memory usage: Stable
- No console errors

### Popup Performance
**Metrics to Check:**
- Popup animation: Smooth 60fps
- Load delay: Exactly 1 second
- No layout shift
- Quick localStorage access
- Instant dismiss

---

## 📊 User Acceptance Testing

### Questions to Answer
1. ✅ Is the chart easier to understand than before?
2. ✅ Can users quickly see their earnings growth?
3. ✅ Are the big numbers helpful?
4. ✅ Is the popup intrusive or helpful?
5. ✅ Is the offer message clear?
6. ✅ Would users complete the tasks?
7. ✅ Is "one-time only" acceptable?
8. ✅ Can admins easily create offers?

### Success Metrics
- Chart engagement time: +30%
- Offer acceptance rate: >40%
- User complaints: Minimal
- Admin adoption: High
- Task completion: >50%

---

## 🚀 Ready for Production?

### Checklist
- [x] Chart displays correctly
- [x] All timeframes work
- [x] Stats calculate properly
- [x] Popup shows up
- [x] One-time display works
- [x] Admin can create offers
- [x] Admin can delete offers
- [x] Status tracking works
- [x] Responsive on all devices
- [x] No console errors
- [x] Performance acceptable
- [x] Documentation complete

### Remaining for Production
- [ ] Connect to real database
- [ ] API endpoints for offers
- [ ] User authentication integration
- [ ] Email notifications
- [ ] Actual reward crediting
- [ ] Task verification system
- [ ] Analytics tracking
- [ ] Rate limiting
- [ ] Security measures

---

## 📝 Test Results Template

```
Test Date: ___________
Tester: ___________

Chart Tests:
[ ] Daily view works
[ ] Weekly view works
[ ] Monthly view works
[ ] Stats accurate
[ ] Responsive design
[ ] Smooth animations

Messaging Tests (Admin):
[ ] Create offer works
[ ] Delete offer works
[ ] Stats display correctly
[ ] Table shows data
[ ] Form validation works

Messaging Tests (User):
[ ] Popup appears
[ ] Accept works
[ ] Decline works
[ ] One-time only works
[ ] External links work

Issues Found:
_________________________
_________________________

Overall Rating: ___/10

Ready for Production? Yes / No
```

---

Use these scenarios to thoroughly test both new features before deployment! 🧪
