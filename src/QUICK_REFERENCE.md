# Quick Reference Card

## 🚀 How to Access Everything

### Main Entry Points
| File | Purpose | Best For |
|------|---------|----------|
| `App.tsx` | Central selector | Overview of all sections |
| `LandingPageApp.tsx` | Public website | Landing & auth flows |
| `CustomerApp.tsx` | User dashboard | Customer experience |
| `AdminApp.tsx` | Admin panel | Platform management |

---

## 📊 New Feature: Income Chart

**Location**: Customer Dashboard  
**Tabs**: Daily / Weekly / Monthly  
**Shows**:
- 💵 Total Earned
- 📅 Average per Period  
- ↗️ Growth Rate
- 📊 Simple bar chart

**To Test**:
1. Open `CustomerApp.tsx`
2. Scroll to "Your Money Growth"
3. Click timeframe tabs
4. Hover over bars

---

## 💌 New Feature: Messaging System

### For Admin
**Location**: Admin Dashboard → Messages Tab

**Quick Create**:
1. Click "Create New Offer"
2. Select user
3. Enter title (e.g., "Share & Earn $20!")
4. Write message
5. Set reward (e.g., "$20 USDT")
6. Add action label (e.g., "Share Now")
7. Optional: Add URL
8. Send!

**Stats**:
- Total messages
- Pending (yellow)
- Accepted (green)
- Declined (red)

### For Customers
**Location**: Appears on dashboard login

**Experience**:
1. Login to dashboard
2. Popup appears (1 sec delay)
3. See offer details
4. Click action or decline
5. Won't show again

---

## 📁 Standalone Pages for Figma

### Landing & Auth
```
/pages/Landing.tsx
/pages/Login.tsx
/pages/Signup.tsx
/pages/EmailVerify.tsx
/pages/IdentityVerify.tsx
/pages/ForgotPass.tsx
```

### Customer
```
/pages/CustomerDashboard.tsx
/pages/InvestmentPacksPage.tsx
/pages/TransactionsPage.tsx
/pages/ReferralsPage.tsx
```

### Admin
```
/pages/AdminUsers.tsx
/pages/AdminKYC.tsx
/pages/AdminDeposits.tsx
/pages/AdminWithdrawals.tsx
/pages/AdminInvestments.tsx
/pages/AdminAffiliates.tsx
/pages/AdminMessages.tsx    ← NEW!
```

---

## 🎯 Investment Packs Quick Reference

| Pack | Investment | Daily % | Annual |
|------|-----------|---------|--------|
| Starter | $100+ | 1.5% | ~547% |
| Professional | $1,000+ | 2.0% | ~730% |
| Premium | $5,000+ | 2.5% | ~913% |
| Elite | $20,000+ | 3.0% | ~1,095% |

---

## 🏗️ Investment Projects

1. **Commercial Real Estate** - Manhattan - 12.5%
2. **Solar Energy Farm** - California - 15.2%
3. **Tech Startup Portfolio** - Silicon Valley - 22.8%
4. **Luxury Residential** - Miami - 10.5%
5. **Crypto Trading Fund** - Global - 28.3%
6. **Agricultural Investment** - Midwest - 11.8%

**Total Portfolio**: $57.9M across 6 projects

---

## 💬 Message System Use Cases

### Examples
1. **Social Share**: "Share on Facebook → $20"
2. **Referral**: "Refer 3 friends → $50"
3. **Upgrade**: "Upgrade now → 10% bonus"
4. **KYC**: "Complete verification → $10"
5. **Survey**: "Take survey → $5"

### Best Practices
- ✅ Clear, specific titles
- ✅ Achievable tasks
- ✅ Fair rewards
- ✅ Test external links
- ✅ Set expiry dates for urgency

---

## 🎨 Design System

### Colors
- **Primary**: Blue (#3b82f6) → Purple (#8b5cf6)
- **Success**: Green (#10b981)
- **Warning**: Yellow (#eab308)
- **Danger**: Red (#ef4444)

### Effects
- **Glassmorphism**: bg-white/10 + backdrop-blur
- **Gradients**: Blue/purple throughout
- **Animations**: 300ms transitions

---

## 📚 Documentation Files

| File | Content |
|------|---------|
| `README.md` | Main overview |
| `FIGMA_GUIDE.md` | How to access pages |
| `MESSAGING_SYSTEM_GUIDE.md` | Complete messaging docs |
| `LATEST_UPDATES.md` | What's new |
| `TEST_SCENARIOS.md` | Testing guide |
| `VISUAL_FEATURE_GUIDE.md` | Visual layouts |
| `QUICK_REFERENCE.md` | This file |

---

## ⌨️ Keyboard Shortcuts (Future)

```
Coming soon:
- Esc: Close popup
- Tab: Navigate form
- Enter: Submit form
- Arrow keys: Navigate table
```

---

## 🐛 Troubleshooting

### Chart not showing?
- ✅ Check selectedPack is not null
- ✅ Verify investment pack is active

### Popup not appearing?
- ✅ Check localStorage (clear if needed)
- ✅ Open in incognito mode
- ✅ Verify offer exists in mock data

### Can't create offer?
- ✅ Fill all required fields (marked with *)
- ✅ Select a user from dropdown
- ✅ Check console for errors

---

## 📊 Mock User Data

### Admin Login
- Email: `admin@investpro.com`
- (Mock - any password works)

### Test Users
1. John Doe - john@example.com
2. Sarah Smith - sarah@example.com
3. Michael Chen - michael@example.com
4. Emma Wilson - emma@example.com
5. James Brown - james@example.com

---

## ✅ Quick Checklist

### Before Demo
- [ ] Test all 3 main apps
- [ ] Verify chart toggles work
- [ ] Check popup appears
- [ ] Test offer creation
- [ ] Review on mobile
- [ ] Clear localStorage if needed

### Before Development
- [ ] Read documentation
- [ ] Understand data flow
- [ ] Plan backend integration
- [ ] Review security needs
- [ ] Set up database schema

### Before Production
- [ ] Connect real database
- [ ] Add authentication
- [ ] Enable payments
- [ ] Test thoroughly
- [ ] Security audit
- [ ] Performance optimization

---

## 🎯 Key Statistics

**Platform**:
- 25,000+ active investors
- $50M+ total invested
- $8M+ paid returns
- 150+ countries
- 4.9/5.0 rating

**Projects**:
- 6 active projects
- $57.9M portfolio value
- 16.8% average yield
- 8,542 investors

---

## 🚀 Next Actions

1. **Explore**: Open `App.tsx` and click around
2. **Test Chart**: Toggle daily/weekly/monthly
3. **Create Offer**: Go to admin messages
4. **See Popup**: Open customer dashboard
5. **Read Docs**: Check `MESSAGING_SYSTEM_GUIDE.md`

---

## 💡 Pro Tips

1. **Testing Popups**: Use incognito mode for fresh localStorage
2. **Multiple Offers**: Create several to see table populate
3. **Chart Data**: Try different investment packs to see changes
4. **Responsive**: Test on mobile (DevTools → Device Mode)
5. **Colors**: All in Tailwind classes, easy to customize

---

## 📞 Support Resources

- **Features**: `MESSAGING_SYSTEM_GUIDE.md`
- **Access**: `FIGMA_GUIDE.md`
- **Testing**: `TEST_SCENARIOS.md`
- **Visual**: `VISUAL_FEATURE_GUIDE.md`
- **Updates**: `LATEST_UPDATES.md`

---

## ⚡ One-Liners

**Chart**: Daily/Weekly/Monthly income tracking with big, clear numbers

**Messages**: Admin sends custom offers → User sees popup once → Accept or decline

**Projects**: 6 investment opportunities with images on landing page

**Complete**: Every feature separated, documented, and Figma-ready

---

Print this page for quick reference while exploring the platform! 📄
