export const siteData = {
  gym: {
    name: 'CrossIron Athletics',
    tagline: 'Functional Fitness · CrossFit · Community',
    location: 'Denver, CO',
    address: '1840 Blake St, Denver, CO 80202',
    phone: '(720) 555-0433',
    email: 'train@crossironathletics.com',
  },
  stats: [
    { value: '340+', label: 'Active Members' },
    { value: '18', label: 'Classes / Week' },
    { value: '6 AM', label: 'First Class' },
    { value: '2016', label: 'Founded' },
  ],
  movements: [
    { icon: '🏋️', name: 'Olympic Lifting', desc: 'Snatch, clean & jerk — expert coaching from intro to competition level.' },
    { icon: '🔥', name: 'MetCon', desc: 'High-intensity metabolic conditioning circuits — every session is different.' },
    { icon: '🤸', name: 'Gymnastics', desc: 'Kipping pull-ups, handstands, muscle-ups — body control and midline stability.' },
    { icon: '🏃', name: 'Monostructural', desc: 'Running, rowing, cycling — aerobic engines that power everything else.' },
  ],
  classes: [
    { name: 'CrossFit', level: 'All Levels', duration: '60 min', desc: 'The signature class. Warm-up, strength or skill work, then the WOD. Coached. Scaled. Shared.' },
    { name: 'Foundations', level: 'Beginner', duration: '75 min', desc: 'Your on-ramp to CrossFit. 6-session course covering fundamental movements before you join regular classes.' },
    { name: 'Open Gym', level: 'Members Only', duration: '90 min', desc: 'Self-directed training on your schedule. Full equipment access. Optional coach check-in.' },
    { name: 'Barbell Club', level: 'Intermediate+', duration: '90 min', desc: 'Structured programming for Olympic lifting and powerlifting. Technique-first, strength always.' },
    { name: 'Endurance', level: 'All Levels', duration: '55 min', desc: 'Running-focused metabolic conditioning. Intervals, tempo, and threshold work. No barbell required.' },
    { name: 'Kids CrossFit', level: 'Ages 6–14', duration: '45 min', desc: 'Age-appropriate functional movement, coordination, and teamwork. The best way to build athletic confidence early.' },
  ],
  pricing: [
    {
      name: 'Drop-In',
      price: '$28',
      period: 'per class',
      features: ['Single class access', 'All equipment included', 'Coach-led session', 'Visitor welcome'],
      highlight: false,
    },
    {
      name: 'Unlimited',
      price: '$159',
      period: 'per month',
      features: ['Unlimited classes', 'Barbell Club included', 'Open gym access', 'Nutrition check-in (monthly)', 'Member community app'],
      highlight: true,
    },
    {
      name: 'Foundations',
      price: '$199',
      period: 'one-time',
      features: ['6-class on-ramp program', 'Private movement assessment', '1-on-1 goal session', 'Unlimited access after graduation'],
      highlight: false,
    },
  ],
};
