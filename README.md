# Cosmic Sparc - Event Management Platform

A modern, comprehensive event management platform built with React, TypeScript, and Tailwind CSS. Designed specifically for the Indian market, Cosmic Sparc empowers event organizers to create, manage, and grow their events seamlessly.

## 🚀 Features

### For Event Organizers
- **Event Creation**: Multi-step form with drag-and-drop image upload
- **Dashboard**: Comprehensive analytics and event management
- **Ticket Management**: Multiple ticket types and pricing tiers
- **Real-time Analytics**: Sales tracking, attendee insights, and performance metrics
- **Payment Processing**: Secure payment integration with Stripe
- **Marketing Tools**: Social sharing, email campaigns, and promotional features

### For Attendees
- **Event Discovery**: Advanced search and filtering capabilities
- **Category Browsing**: Music, Technology, Business, Health & Wellness, and more
- **Secure Booking**: Easy ticket purchase with multiple payment options
- **Event Details**: Comprehensive information including agenda and organizer details
- **User Profiles**: Personal event history and preferences

## 🎨 Design System

### Color Palette
- **Primary Blue**: `#006D92` - Trust, professionalism, technology
- **Accent Orange**: `#e28618` - Energy, creativity, warmth
- **Neutral Grays**: Clean, modern interface elements

### Typography
- **Headings**: Bold, impactful typography for hierarchy
- **Body Text**: Clean, readable fonts for content
- **Brand Font**: Custom styling for Cosmic Sparc branding

### Components
- **Cards**: Rounded corners with subtle shadows
- **Buttons**: Gradient backgrounds with hover effects
- **Forms**: Clean inputs with focus states
- **Navigation**: Sticky header with backdrop blur

## 📁 Component Structure

```
components/
├── ui/                    # Reusable UI components
│   ├── button.tsx        # Button component with variants
│   ├── card.tsx          # Card layout components
│   ├── input.tsx         # Form input component
│   └── badge.tsx         # Status and label badges
├── HomePage.tsx          # Landing page with event discovery
├── EventDetails.tsx      # Detailed event view with booking
├── CreateEvent.tsx       # Event creation wizard
├── Dashboard.tsx         # Organizer dashboard with analytics
├── Profile.tsx           # User profile and settings
├── Navigation.tsx        # Reusable navigation component
└── Footer.tsx            # Site footer with links and info
```

## 🛠️ Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Icons**: Lucide React for consistent iconography
- **UI Components**: Custom component library
- **State Management**: React hooks and context
- **Build Tool**: Vite for fast development

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-org/cosmic-sparc.git
cd cosmic-sparc
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📱 Responsive Design

The platform is fully responsive and optimized for:
- **Desktop**: Full-featured experience with advanced tools
- **Tablet**: Optimized layouts for touch interaction
- **Mobile**: Streamlined interface for on-the-go event discovery

## 🎯 Key Pages

### HomePage
- Hero section with search functionality
- Category browsing with visual cards
- Featured events showcase
- Trust indicators and statistics
- Call-to-action sections

### EventDetails
- Comprehensive event information
- Ticket booking sidebar
- Organizer details and ratings
- Event agenda and description
- Social sharing options

### Dashboard
- Real-time analytics overview
- Event management interface
- Quick actions and shortcuts
- Recent activity feed
- Performance metrics

### CreateEvent
- Multi-step form wizard
- Progress indicators
- Image upload functionality
- Preview capabilities
- Draft saving

## 🔧 Customization

### Theme Configuration
The design system can be customized by modifying:
- Color variables in Tailwind config
- Component variants in UI components
- Typography scales
- Spacing and layout utilities

### Component Props
All components support extensive customization through props:
- Variants for different styles
- Size options for responsive design
- Custom className support
- Event handlers and callbacks

## 📊 Performance

- **Lazy Loading**: Components loaded on demand
- **Image Optimization**: Responsive images with proper sizing
- **Code Splitting**: Route-based code splitting
- **Bundle Optimization**: Tree shaking and minification

## 🔒 Security

- **Input Validation**: Form validation and sanitization
- **XSS Protection**: React's built-in XSS protection
- **Secure Payments**: Stripe integration for payment processing
- **Data Privacy**: GDPR-compliant data handling

## 🌟 Future Enhancements

- **Mobile App**: React Native application
- **AI Features**: Smart event recommendations
- **Advanced Analytics**: Machine learning insights
- **Multi-language**: Internationalization support
- **API Integration**: Third-party service connections

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions:
- Email: hello@cosmicsparc.com
- Phone: +91 98765 43210
- Website: www.cosmicsparc.com

---

**Made with ❤️ in India** 🇮🇳
