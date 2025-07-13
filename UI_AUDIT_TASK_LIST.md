# Cosmic Sparc - UI Audit Task List

## 🚨 **CRITICAL - Navigation & Layout Conflicts**

### **Task 1: Remove Duplicate Navbars (URGENT)**
- **Issue**: Multiple navbars conflicting (`HomeNavbar`, `Navigation`, `RootNavbar`, embedded navs in components)
- **Files to fix**:
  - `app/layout.tsx` - Remove `<HomeNavbar />` 
  - `components/HomePage.tsx` - Remove embedded nav
  - `components/Profile.tsx` - Remove embedded nav  
  - `components/EventDetails.tsx` - Remove embedded nav
  - `components/CreateEvent.tsx` - Remove embedded nav
  - `components/Dashboard.tsx` - Remove embedded nav
- **Action**: Replace all with unified `RootNavbar` with context prop
- **Priority**: 🔴 URGENT
- **Estimated Time**: 2-3 hours

### **Task 2: Integrate RootProvider (URGENT)**
- **Issue**: Context not available, causing linter errors
- **Files to fix**:
  - `app/layout.tsx` - Wrap children in `<RootProvider>`
- **Action**: Add provider and remove old navbar
- **Priority**: 🔴 URGENT
- **Estimated Time**: 30 minutes

### **Task 3: Fix Dashboard Layout Conflicts (HIGH)**
- **Issue**: `AdminLayout` has its own sidebar, conflicts with new `DashboardSidebar`
- **Files to fix**:
  - `components/layout/AdminLayout.tsx` - Remove old sidebar logic
  - All dashboard pages - Update to use new sidebar
- **Action**: Replace with new unified layout system
- **Priority**: 🟠 HIGH
- **Estimated Time**: 3-4 hours

---

## 🎨 **HIGH PRIORITY - UI/UX Improvements**

### **Task 4: Home Screen Redesign (HIGH)**
- **Current Issues**:
  - No features carousel
  - Static category icons (need transparent backgrounds)
  - No location filter
  - Inconsistent branding
- **Files to update**:
  - `app/page.tsx` - Add carousel, dynamic categories, location filter
  - `components/HomePage.tsx` - Remove (redundant)
- **Action**: Create modern, BookMyShow-style homepage
- **Priority**: 🟠 HIGH
- **Estimated Time**: 6-8 hours

### **Task 5: Location Awareness System (HIGH)**
- **Missing Features**:
  - IP-based city detection
  - City selection modal
  - Event filtering by city
- **Files to create**:
  - `components/LocationModal.tsx`
  - `lib/location.ts` - IP detection service
- **Action**: Implement location-aware event filtering
- **Priority**: 🟠 HIGH
- **Estimated Time**: 4-5 hours

### **Task 6: My Account Section (HIGH)**
- **Missing Features**:
  - `/account` route with tabs
  - Ticket history with QR codes
  - Profile management
  - Settings
- **Files to create**:
  - `app/account/page.tsx`
  - `app/account/tickets/page.tsx`
  - `app/account/settings/page.tsx`
- **Action**: Complete user account experience
- **Priority**: 🟠 HIGH
- **Estimated Time**: 8-10 hours

---

## 🔧 **MEDIUM PRIORITY - Feature Completion**

### **Task 7: Event Creation UX (MEDIUM)**
- **Current Issues**:
  - Single-page form (needs multi-step)
  - No dynamic location API
  - No OTP verification
  - Poor UX flow
- **Files to update**:
  - `app/dashboard/events/create/page.tsx` - Convert to multi-step
  - `components/forms/FormRenderer.tsx` - Add location API integration
- **Action**: Create wizard-style event creation
- **Priority**: 🟡 MEDIUM
- **Estimated Time**: 10-12 hours

### **Task 8: Event View Page Redesign (MEDIUM)**
- **Current Issues**:
  - Registration form embedded in view page
  - Poor visual hierarchy
  - Missing ticket price display
- **Files to update**:
  - `app/events/[slug]/page.tsx` - Separate view from registration
  - `app/events/[slug]/register/page.tsx` - Dedicated registration page
- **Action**: Create modern event view page
- **Priority**: 🟡 MEDIUM
- **Estimated Time**: 6-8 hours

### **Task 9: Dashboard Analytics (MEDIUM)**
- **Current Issues**:
  - Static stats (not real data)
  - Missing charts/graphs
  - Poor data visualization
- **Files to update**:
  - `app/dashboard/page.tsx` - Add real analytics
  - `components/Dashboard.tsx` - Remove (redundant)
- **Action**: Implement real-time dashboard analytics
- **Priority**: 🟡 MEDIUM
- **Estimated Time**: 8-10 hours

---

## 🎯 **LOW PRIORITY - Polish & Optimization**

### **Task 10: Component Library Cleanup (LOW)**
- **Issues**:
  - Redundant components (`Dashboard.tsx`, `HomePage.tsx`)
  - Inconsistent styling
  - Missing TypeScript types
- **Files to clean**:
  - Remove redundant components
  - Standardize color variables
  - Add proper TypeScript interfaces
- **Action**: Clean up component library
- **Priority**: 🟢 LOW
- **Estimated Time**: 4-6 hours

### **Task 11: Mobile Responsiveness (LOW)**
- **Issues**:
  - Mobile menu not implemented
  - Poor tablet experience
  - Touch interactions missing
- **Action**: Implement responsive mobile navigation
- **Priority**: 🟢 LOW
- **Estimated Time**: 6-8 hours

### **Task 12: Performance Optimization (LOW)**
- **Issues**:
  - Large bundle size
  - No image optimization
  - Missing loading states
- **Action**: Optimize images, add loading skeletons
- **Priority**: 🟢 LOW
- **Estimated Time**: 4-6 hours

---

## 📋 **IMMEDIATE ACTION PLAN**

### **Phase 1 (Today) - Critical Fixes**
1. ✅ **Task 1**: Remove duplicate navbars
2. ✅ **Task 2**: Integrate RootProvider  
3. ✅ **Task 3**: Fix dashboard layout conflicts

**Total Phase 1 Time**: 5-7 hours

### **Phase 2 (This Week) - Core Features**
4. **Task 4**: Home screen redesign
5. **Task 5**: Location awareness system
6. **Task 6**: My account section

**Total Phase 2 Time**: 18-23 hours

### **Phase 3 (Next Week) - Polish**
7. **Task 7**: Event creation UX
8. **Task 8**: Event view page redesign
9. **Task 9**: Dashboard analytics

**Total Phase 3 Time**: 24-30 hours

### **Phase 4 (Future) - Optimization**
10. **Task 10**: Component library cleanup
11. **Task 11**: Mobile responsiveness
12. **Task 12**: Performance optimization

**Total Phase 4 Time**: 14-20 hours

---

## 📊 **PROGRESS TRACKING**

### **Completed Tasks**
- [x] RootContext implementation
- [x] RootNavbar component
- [x] DashboardSidebar component

### **In Progress**
- [ ] Task 1: Remove duplicate navbars
- [ ] Task 2: Integrate RootProvider
- [ ] Task 3: Fix dashboard layout conflicts

### **Pending**
- [ ] Task 4: Home screen redesign
- [ ] Task 5: Location awareness system
- [ ] Task 6: My account section
- [ ] Task 7: Event creation UX
- [ ] Task 8: Event view page redesign
- [ ] Task 9: Dashboard analytics
- [ ] Task 10: Component library cleanup
- [ ] Task 11: Mobile responsiveness
- [ ] Task 12: Performance optimization

---

## 🎯 **SUCCESS METRICS**

### **Phase 1 Success Criteria**
- [ ] No duplicate navbars anywhere in the app
- [ ] RootProvider working without linter errors
- [ ] Dashboard layout using unified sidebar system
- [ ] All pages using context-aware navigation

### **Phase 2 Success Criteria**
- [ ] Modern homepage with carousel and categories
- [ ] Location detection and filtering working
- [ ] Complete user account section functional
- [ ] BookMyShow-level user experience

### **Phase 3 Success Criteria**
- [ ] Multi-step event creation with OTP
- [ ] Separate event view and registration pages
- [ ] Real-time dashboard analytics
- [ ] Professional event platform experience

---

## 📝 **NOTES**

- **Total Estimated Time**: 61-80 hours
- **Critical Path**: Phase 1 → Phase 2 → Phase 3
- **Dependencies**: Each phase depends on the previous phase completion
- **Risk Factors**: 
  - Context integration complexity
  - Location API integration
  - OTP verification system
  - Real-time analytics implementation

---

**Last Updated**: [Current Date]
**Status**: Planning Phase
**Next Review**: After Phase 1 completion 