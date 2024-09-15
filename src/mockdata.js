// src/mockData.js

import bellImage from './assets/ring.jpg';
import viewguardImage from './assets/bell.jpeg';
import secureboltImage from './assets/biometric.jpeg';
import echosphereImage from './assets/speaker.jpeg';
import lumiglowImage from './assets/bulb.jpeg';
import ecocontrolImage from './assets/thermostat.jpg';

export const mockData = {
  'doorbells': [
    {id: 'DB001', name: 'SmartRing Pro', brand: 'SecureHome', price: 199.99, discount: 10, rebate: 20, description: 'Advanced smart doorbell with HD video and audio capabilities.', features: ['1080p HD video', 'Two-way audio', 'Night vision', 'Motion detection'], batteryLife: '6 months', wirelessProtocol: 'Wi-Fi', image: bellImage},
    {id: 'DB002', name: 'ViewGuard 2', brand: 'SafetyFirst', price: 149.99, discount: 5, rebate: 0, description: 'Reliable smart doorbell with cloud storage and weatherproof design.', features: ['720p HD video', 'Cloud storage', 'Weatherproof', 'Customizable chimes'], batteryLife: '3 months', wirelessProtocol: 'Wi-Fi', image: viewguardImage }
  ],
  'doorlocks': [
    {id: 'DL001', name: 'SecureBolt Z10', brand: 'LockMaster', price: 249.99, discount: 0, rebate: 30, description: 'Biometric door lock with smartphone app control.', features: ['Fingerprint scanner', 'PIN code', 'Smartphone app control', 'Auto-lock'], batteryLife: '12 months', wirelessProtocol: 'Z-Wave', image: secureboltImage}
  ],
  'speakers': [
    {id: 'SS001', name: 'EchoSphere', brand: 'SoundTech', price: 129.99, discount: 15, rebate: 0, description: 'Smart speaker with Alexa integration and 360° audio.', features: ['360° sound', 'Voice assistant', 'Multi-room audio', 'Smart home hub'], wirelessProtocol: 'Wi-Fi, Bluetooth', powerSource: 'AC adapter', image: echosphereImage}
  ],
  'lighting': [
    {id: 'SL001', name: 'LumiGlow A19', brand: 'BrightLife', price: 29.99, discount: 0, rebate: 5, description: 'Smart LED bulb with color changing capabilities.', features: ['Color changing', 'Dimmable', 'Schedule setting', 'Voice control compatible'], wattage: '9W', wirelessProtocol: 'Wi-Fi', image: lumiglowImage}
  ],
  'thermostats': [
    {id: 'ST001', name: 'EcoControl E3', brand: 'ClimateWise', price: 179.99, discount: 8, rebate: 25, description: 'Smart thermostat with learning algorithms and remote sensors.', features: ['Learning algorithm', 'Remote sensors', 'Energy reports', 'HVAC monitoring'], displayType: 'Color touchscreen', wirelessProtocol: 'Wi-Fi', image: ecocontrolImage}
  ]
};