# AutoCross Championship Website

A modern, animated website for autocross racing events featuring smooth scrolling animations, interactive elements, and a comprehensive event management system.

## 🏁 Features

### Core Functionality
- **Event Management**: Detailed event listings with registration capabilities
- **Interactive Registration**: Complete registration form with event selection
- **Responsive Design**: Optimized for desktop and mobile devices
- **Smooth Animations**: GSAP-powered scroll animations and transitions
- **Custom Cursor**: Racing-themed interactive cursor effects

### Design Elements
- **Racing Theme**: Red (#FF4444) and dark color scheme
- **Modern UI**: Clean, professional design with racing aesthetics
- **Animated Elements**: Smooth transitions and hover effects
- **Custom Logo**: SVG-based autocross racing logo

## 📁 File Structure

```
Animated-Website/
├── index.html          # Main homepage
├── events.html         # Events listing page
├── register.html       # Registration form
├── schedule.html       # Event schedule (to be created)
├── results.html        # Race results (to be created)
├── style.css           # Main stylesheet
├── script.js           # JavaScript animations
├── image/
│   ├── autocross-logo.svg  # Custom racing logo
│   └── DUO.PN.png         # Original logo (kept for reference)
└── README.md           # This documentation
```

## 🎨 Design System

### Color Palette
- **Primary Red**: #FF4444 (racing theme)
- **Secondary Red**: #FF6666 (hover states)
- **Background**: #1a1a1a (dark theme)
- **Card Background**: #2a2a2a (gradient)
- **Text**: #ffffff (white)
- **Secondary Text**: #cccccc (light gray)

### Typography
- **Font Family**: PP mori (custom font)
- **Headings**: Large, bold with racing red accent
- **Body Text**: Clean, readable with proper contrast

## 🚀 Getting Started

### Prerequisites
- Modern web browser with JavaScript enabled
- Local web server (for development)

### Installation
1. Clone or download the project files
2. Open `index.html` in your web browser
3. Navigate through the different pages using the navigation menu

### Development
- Edit HTML files for content changes
- Modify `style.css` for styling updates
- Update `script.js` for animation modifications

## 📱 Pages Overview

### Homepage (`index.html`)
- Hero section with racing tagline
- About section explaining autocross events
- Featured events showcase
- Racing skills highlights (Strategy, Precision, Speed)
- Upcoming events grid

### Events Page (`events.html`)
- Detailed event cards with information
- Event features and requirements
- Registration buttons for each event
- Hover animations and effects

### Registration Page (`register.html`)
- Interactive event selection
- Comprehensive registration form
- Safety requirements and guidelines
- Form validation and submission

## 🎯 Key Features

### Interactive Elements
- **Custom Cursor**: Racing-themed cursor that changes on hover
- **Smooth Scrolling**: Locomotive Scroll for enhanced navigation
- **GSAP Animations**: Professional scroll-triggered animations
- **Hover Effects**: Interactive elements with racing red highlights

### Event Management
- **Event Selection**: Choose from multiple racing events
- **Registration System**: Complete driver registration process
- **Safety Guidelines**: Clear requirements and safety information
- **Pricing Display**: Transparent event pricing

### Responsive Design
- **Mobile Optimized**: Works on all device sizes
- **Flexible Layout**: Grid and flexbox-based responsive design
- **Touch Friendly**: Optimized for touch interactions

## 🔧 Technical Implementation

### Animation System
- **GSAP**: Professional animation library
- **ScrollTrigger**: Scroll-based animation triggers
- **Locomotive Scroll**: Smooth scrolling implementation
- **Custom Cursor**: JavaScript-powered cursor effects

### Form Handling
- **Event Selection**: Interactive event picking system
- **Form Validation**: Client-side validation
- **Data Collection**: Comprehensive driver information
- **Submission Handling**: Form processing and feedback

### Styling Approach
- **CSS Grid**: Modern layout system
- **Flexbox**: Flexible component layouts
- **CSS Variables**: Consistent theming
- **Gradients**: Modern visual effects

## 🏆 Future Enhancements

### Planned Features
- **Results Page**: Live race results and leaderboards
- **Schedule Page**: Detailed event calendar
- **Photo Gallery**: Event photography showcase
- **Driver Profiles**: Individual driver statistics
- **Live Timing**: Real-time race timing system

### Technical Improvements
- **Backend Integration**: PHP/MySQL for data management
- **User Authentication**: Driver account system
- **Payment Processing**: Online payment integration
- **Email Notifications**: Automated confirmation emails
- **Mobile App**: Native mobile application

## 📞 Support

For questions or support regarding the autocross website:
- Check the documentation in this README
- Review the code comments for implementation details
- Test all interactive elements thoroughly
- Ensure cross-browser compatibility

## 🎨 Customization

### Changing Colors
Update the CSS variables in `style.css`:
```css
:root {
    --primary-red: #FF4444;
    --secondary-red: #FF6666;
    --background-dark: #1a1a1a;
}
```

### Adding Events
Edit the events in `events.html` and update the registration form in `register.html` to include new event options.

### Modifying Animations
Adjust GSAP animations in `script.js` to change timing, effects, or triggers.

---

**Built with passion for racing and modern web development. 🏁**
