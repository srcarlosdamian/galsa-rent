import {
  AlertCircle, ArrowLeft, ArrowRight, ArrowUpDown, Award, BookOpen, Box, Briefcase,
  Building2, Calendar, CalendarCheck, CalendarRange, Camera, Car, CarFront, Check,
  CheckCircle2, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, ClipboardCheck,
  Clock, Compass, Copy, CreditCard, DollarSign, Edit3, ExternalLink, Eye, EyeOff,
  FileCheck, FileSignature, FileText, Fuel, Gauge, Globe, Grid, Heart, HelpCircle,
  Hotel, Info, Key, KeyRound, Landmark, Layers, Loader2, Lock, LogOut, Mail, MapPin,
  Menu, MessageSquare, Minus, Navigation, Palette, Percent, Phone, Plane, Plus,
  RefreshCw, RotateCcw, Search, Share2, Shield, ShieldCheck, Sliders, SlidersHorizontal,
  Smartphone, Sparkles, Star, ThumbsUp, Train, UploadCloud, User, UserPlus, Users,
  Wallet, Wind, X, Zap,
  type LucideIcon,
} from 'lucide-react';

export interface DocumentedLucideIcon {
  name: string;
  category: 'Navegación' | 'Acciones' | 'Vehículo' | 'Documentos y Pagos' | 'Seguridad y Confianza' | 'Ubicación y Tiempo' | 'UI y Sistema';
  icon: LucideIcon;
}

export const DOCUMENTED_LUCIDE_ICONS: DocumentedLucideIcon[] = [
  // Navegación
  { name: 'ArrowLeft', category: 'Navegación', icon: ArrowLeft },
  { name: 'ArrowRight', category: 'Navegación', icon: ArrowRight },
  { name: 'ArrowUpDown', category: 'Navegación', icon: ArrowUpDown },
  { name: 'ChevronDown', category: 'Navegación', icon: ChevronDown },
  { name: 'ChevronLeft', category: 'Navegación', icon: ChevronLeft },
  { name: 'ChevronRight', category: 'Navegación', icon: ChevronRight },
  { name: 'ChevronUp', category: 'Navegación', icon: ChevronUp },
  { name: 'ExternalLink', category: 'Navegación', icon: ExternalLink },
  { name: 'Menu', category: 'Navegación', icon: Menu },
  { name: 'Navigation', category: 'Navegación', icon: Navigation },
  { name: 'Compass', category: 'Navegación', icon: Compass },

  // Acciones
  { name: 'Check', category: 'Acciones', icon: Check },
  { name: 'CheckCircle2', category: 'Acciones', icon: CheckCircle2 },
  { name: 'Copy', category: 'Acciones', icon: Copy },
  { name: 'Edit3', category: 'Acciones', icon: Edit3 },
  { name: 'Eye', category: 'Acciones', icon: Eye },
  { name: 'EyeOff', category: 'Acciones', icon: EyeOff },
  { name: 'Heart', category: 'Acciones', icon: Heart },
  { name: 'LogOut', category: 'Acciones', icon: LogOut },
  { name: 'Minus', category: 'Acciones', icon: Minus },
  { name: 'Plus', category: 'Acciones', icon: Plus },
  { name: 'RefreshCw', category: 'Acciones', icon: RefreshCw },
  { name: 'RotateCcw', category: 'Acciones', icon: RotateCcw },
  { name: 'Search', category: 'Acciones', icon: Search },
  { name: 'Share2', category: 'Acciones', icon: Share2 },
  { name: 'UploadCloud', category: 'Acciones', icon: UploadCloud },
  { name: 'X', category: 'Acciones', icon: X },

  // Vehículo
  { name: 'Car', category: 'Vehículo', icon: Car },
  { name: 'CarFront', category: 'Vehículo', icon: CarFront },
  { name: 'Fuel', category: 'Vehículo', icon: Fuel },
  { name: 'Gauge', category: 'Vehículo', icon: Gauge },
  { name: 'Key', category: 'Vehículo', icon: Key },
  { name: 'KeyRound', category: 'Vehículo', icon: KeyRound },
  { name: 'Sliders', category: 'Vehículo', icon: Sliders },
  { name: 'SlidersHorizontal', category: 'Vehículo', icon: SlidersHorizontal },
  { name: 'Wind', category: 'Vehículo', icon: Wind },
  { name: 'Zap', category: 'Vehículo', icon: Zap },

  // Documentos y Pagos
  { name: 'BookOpen', category: 'Documentos y Pagos', icon: BookOpen },
  { name: 'Briefcase', category: 'Documentos y Pagos', icon: Briefcase },
  { name: 'ClipboardCheck', category: 'Documentos y Pagos', icon: ClipboardCheck },
  { name: 'CreditCard', category: 'Documentos y Pagos', icon: CreditCard },
  { name: 'DollarSign', category: 'Documentos y Pagos', icon: DollarSign },
  { name: 'FileCheck', category: 'Documentos y Pagos', icon: FileCheck },
  { name: 'FileSignature', category: 'Documentos y Pagos', icon: FileSignature },
  { name: 'FileText', category: 'Documentos y Pagos', icon: FileText },
  { name: 'Landmark', category: 'Documentos y Pagos', icon: Landmark },
  { name: 'Percent', category: 'Documentos y Pagos', icon: Percent },
  { name: 'Wallet', category: 'Documentos y Pagos', icon: Wallet },

  // Seguridad y Confianza
  { name: 'AlertCircle', category: 'Seguridad y Confianza', icon: AlertCircle },
  { name: 'Award', category: 'Seguridad y Confianza', icon: Award },
  { name: 'HelpCircle', category: 'Seguridad y Confianza', icon: HelpCircle },
  { name: 'Info', category: 'Seguridad y Confianza', icon: Info },
  { name: 'Lock', category: 'Seguridad y Confianza', icon: Lock },
  { name: 'Shield', category: 'Seguridad y Confianza', icon: Shield },
  { name: 'ShieldCheck', category: 'Seguridad y Confianza', icon: ShieldCheck },
  { name: 'Star', category: 'Seguridad y Confianza', icon: Star },
  { name: 'ThumbsUp', category: 'Seguridad y Confianza', icon: ThumbsUp },

  // Ubicación y Tiempo
  { name: 'Building2', category: 'Ubicación y Tiempo', icon: Building2 },
  { name: 'Calendar', category: 'Ubicación y Tiempo', icon: Calendar },
  { name: 'CalendarCheck', category: 'Ubicación y Tiempo', icon: CalendarCheck },
  { name: 'CalendarRange', category: 'Ubicación y Tiempo', icon: CalendarRange },
  { name: 'Clock', category: 'Ubicación y Tiempo', icon: Clock },
  { name: 'Globe', category: 'Ubicación y Tiempo', icon: Globe },
  { name: 'Hotel', category: 'Ubicación y Tiempo', icon: Hotel },
  { name: 'MapPin', category: 'Ubicación y Tiempo', icon: MapPin },
  { name: 'Plane', category: 'Ubicación y Tiempo', icon: Plane },
  { name: 'Train', category: 'Ubicación y Tiempo', icon: Train },

  // UI y Sistema
  { name: 'Box', category: 'UI y Sistema', icon: Box },
  { name: 'Camera', category: 'UI y Sistema', icon: Camera },
  { name: 'Grid', category: 'UI y Sistema', icon: Grid },
  { name: 'Layers', category: 'UI y Sistema', icon: Layers },
  { name: 'Loader2', category: 'UI y Sistema', icon: Loader2 },
  { name: 'Mail', category: 'UI y Sistema', icon: Mail },
  { name: 'MessageSquare', category: 'UI y Sistema', icon: MessageSquare },
  { name: 'Palette', category: 'UI y Sistema', icon: Palette },
  { name: 'Phone', category: 'UI y Sistema', icon: Phone },
  { name: 'Smartphone', category: 'UI y Sistema', icon: Smartphone },
  { name: 'Sparkles', category: 'UI y Sistema', icon: Sparkles },
  { name: 'User', category: 'UI y Sistema', icon: User },
  { name: 'UserPlus', category: 'UI y Sistema', icon: UserPlus },
  { name: 'Users', category: 'UI y Sistema', icon: Users },
];

export interface DocumentedImageIcon {
  name: string;
  src: string;
  usage: string;
}

export const DOCUMENTED_3D_ICONS: DocumentedImageIcon[] = [
  { name: 'benefit-1-control-total.png', src: '/galsa-rent/images/anfitriones/benefit-1-control-total.png', usage: 'Beneficios Anfitrión (Control total)' },
  { name: 'benefit-2-pagos.png', src: '/galsa-rent/images/anfitriones/benefit-2-pagos.png', usage: 'Beneficios Anfitrión (Pagos)' },
  { name: 'benefit-3-seguro.png', src: '/galsa-rent/images/anfitriones/benefit-3-seguro.png', usage: 'Anfitrión · Nosotros (Calidad)' },
  { name: 'benefit-4-soporte.png', src: '/galsa-rent/images/anfitriones/benefit-4-soporte.png', usage: 'Beneficios Anfitrión (Soporte 24/7)' },
  { name: 'benefit-5-tarifa.png', src: '/galsa-rent/images/anfitriones/benefit-5-tarifa.png', usage: 'Anfitrión · Nosotros (Transparencia)' },
  { name: 'benefit-6-ocupacion.png', src: '/galsa-rent/images/anfitriones/benefit-6-ocupacion.png', usage: 'Anfitrión · Nosotros (Economía local)' },
  { name: 'step-1-registrate.png', src: '/galsa-rent/images/anfitriones/step-1-registrate.png', usage: '6 Pasos Anfitrión (Regístrate)' },
  { name: 'step-2-valida-identidad.png', src: '/galsa-rent/images/anfitriones/step-2-valida-identidad.png', usage: '6 Pasos Anfitrión (Valida identidad)' },
  { name: 'step-3-carga-vehiculo.png', src: '/galsa-rent/images/anfitriones/step-3-carga-vehiculo.png', usage: '6 Pasos Anfitrión (Carga vehículo)' },
  { name: 'step-4-recibe-aprobacion.png', src: '/galsa-rent/images/anfitriones/step-4-recibe-aprobacion.png', usage: '6 Pasos Anfitrión (Aprobación)' },
  { name: 'step-5-recibe-reservas.png', src: '/galsa-rent/images/anfitriones/step-5-recibe-reservas.png', usage: '6 Pasos Anfitrión (Reservas)' },
  { name: 'step-6-cobra.png', src: '/galsa-rent/images/anfitriones/step-6-cobra.png', usage: '6 Pasos Anfitrión (Cobra)' },
  { name: 'completa-perfil-lapiz.png', src: '/galsa-rent/images/cuenta/completa-perfil-lapiz.png', usage: 'Banner Completa tu perfil (/cuenta)' },
  { name: 'icon-step-1.webp', src: '/galsa-rent/images/icon-step-1.webp', usage: 'Home · 4 Pasos (Reserva)' },
  { name: 'icon-step-2.webp', src: '/galsa-rent/images/icon-step-2.webp', usage: 'Home · 4 Pasos (Verifica)' },
  { name: 'icon-step-3.webp', src: '/galsa-rent/images/icon-step-3.webp', usage: 'Home · 4 Pasos (Firma)' },
  { name: 'icon-step-4.webp', src: '/galsa-rent/images/icon-step-4.webp', usage: 'Home · 4 Pasos (Recibe)' },
];
