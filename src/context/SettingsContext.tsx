import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'ku' | 'ar';
type Theme = 'light' | 'dark';

interface SettingsContextType {
  theme: Theme;
  language: Language;
  toggleTheme: () => void;
  changeLanguage: (lang: Language) => void;
  t: (key: string | number) => string; // Updated type parameter to cleanly intercept plain numbers
}

const translations = {
  en: {
    systemName: "ZAS Tech SMS",
    home: "Home",
    adminArea: "Admin Portal",
    teacherArea: "Faculty Portal",
    myPortal: "Student Portal",
    login: "Secure Login",
    logout: "Logout",
    heroTitle: "Academic Management, Simplified.",
    heroSubtitle: "A centralized platform designed for modern educational institutions in the Kurdistan Region. Manage computer education student records, track daily attendance, and streamline faculty workflows.",
    registerAccount: "Register Account",
    
    welcomeBack: "Welcome Back",
    signInTo: "Sign in to the Student Management System",
    academicEmail: "Academic Email",
    password: "Password",
    testRole: "System Role (Test Mode)",
    authenticating: "Authenticating...",
    signInSecurely: "Sign In securely",
    createAccount: "Create an Account",
    registerCreds: "Register your official university credentials",
    firstName: "First Name",
    lastName: "Last Name",
    univId: "University ID Number",
    dept: "Department",
    completeReg: "Complete Registration",
    footerText: "ZAS Tech Internship Program. Built with React & TypeScript.",
    
    systemAdmin: "System Administration",
    welcome: "Welcome",
    dbSync: "Database Sync Active",
    totalStudents: "Total Enrolled Students",
    activeFaculty: "Active Faculty Members",
    registeredDepts: "Registered Departments",
    serverUptime: "Server Uptime",
    userDirectory: "User Management Directory",
    fullName: "Full Name",
    emailAddr: "Email Address",
    department: "Department",
    systemRole: "System Role",
    adminActions: "Administrative Actions",
    changeRole: "Change Role",
    delete: "Delete",
    auditLog: "Security Audit Log",
    
    facultyPortal: "Faculty Portal",
    loggedInAs: "Logged in as",
    studentId: "Student ID",
    todayAttendance: "Today's Attendance",
    currentGrade: "Current Grade (%)",
    actions: "Actions",
    update: "Update",
    present: "Present",
    absent: "Absent",
    late: "Late",
    
    studentPortal: "Student Dashboard",
    cumGpa: "Cumulative GPA",
    creditsEarned: "Credits Earned",
    overallAttendance: "Overall Attendance",
    currentCourses: "Current Semester Courses"
  },
  ku: {
    systemName: "سیستەمی زاس تێک",
    home: "سەرەکی",
    adminArea: "پۆرتاڵی بەڕێوەبەر",
    teacherArea: "پۆرتاڵی مامۆستا",
    myPortal: "پۆرتاڵی قوتابی",
    login: "چوونە ژوورەوە",
    logout: "چوونە دەرەوە",
    heroTitle: "بەڕێوەبردنی ئەکادیمی، بە ئاسانی.",
    heroSubtitle: "سەکۆیەکی ناوەندی کە بۆ دامەزراوە پەروەردەییە مۆدێرنەکانی هەرێمی کوردستان دیزاین کراوە. بەڕێوەبردنی تۆمارەکانی قوتابیان، ئامادەنەبوونی ڕۆژانە، و ئاسانکاری بۆ مامۆستایان.",
    registerAccount: "تۆمارکردنی هەژمار",
    
    welcomeBack: "بەخێربێیتەوە",
    signInTo: "چوونە ژوورەوە بۆ سیستەمی بەڕێوەبردنی قوتابیان",
    academicEmail: "ئیمەیڵی ئەکادیمی",
    password: "تێپەڕوشە (پاسۆرد)",
    testRole: "ڕۆڵ لە سیستەم",
    authenticating: "لە سەلماندندایە...",
    signInSecurely: "چوونە ژوورەوەی پارێزراو",
    createAccount: "دروستکردنی هەژمار",
    registerCreds: "زانیارییە فەرمییەکانی زانکۆت تۆمار بکە",
    firstName: "ناوی یەکەم",
    lastName: "ناوی کۆتایی",
    univId: "ژمارەی ناسنامەی زانکۆ",
    dept: "بەش",
    completeReg: "تەواوکردنی تۆمارکردن",
    footerText: "بەرنامەی ڕاهێنانی زاس تێک. دروستکراوە بە React و TypeScript.",
    
    systemAdmin: "بەڕێوەبردنی سیستەم",
    welcome: "بەخێربێیت",
    dbSync: "هاوکاتکردنی بنکەی دراوە چالاکە",
    totalStudents: "کۆی گشتی قوتابیانی تۆمارکراو",
    activeFaculty: "مامۆستایانی چالاک",
    registeredDepts: "بەشە تۆمارکراوەکان",
    serverUptime: "کاتی کارکردنی سێرڤەر",
    userDirectory: "بەڕێوەبردنی بەکارهێنەران",
    fullName: "ناوی تەواو",
    emailAddr: "ئیمەیڵ",
    department: "بەش",
    systemRole: "ڕۆڵ لە سیستەم",
    adminActions: "کردارە کارگێڕییەکان",
    changeRole: "گۆڕینی ڕۆڵ",
    delete: "سڕینەوە",
    auditLog: "تۆماری پشکنینی ئاسایش",
    
    facultyPortal: "پۆرتاڵی مامۆستایان",
    loggedInAs: "چوویتە ژوورەوە وەک",
    studentId: "ژمارەی قوتابی",
    todayAttendance: "ئامادەبوونی ئەمڕۆ",
    currentGrade: "نمرەی ئێستا (%)",
    actions: "کردارەکان",
    update: "نوێکردنەوە",
    present: "ئامادە",
    absent: "نادیار",
    late: "دواکەوتوو",
    
    studentPortal: "پۆرتاڵی قوتابی",
    cumGpa: "تێکڕای نمرەکان (GPA)",
    creditsEarned: "یەکەی بەدەستهاتوو",
    overallAttendance: "ڕێژەی ئامادەبوون",
    currentCourses: "وانەکانی ئەم وەرزە"
  },
  ar: {
    systemName: "نظام زاس تك",
    home: "الرئيسية",
    adminArea: "بوابة الإدارة",
    teacherArea: "بوابة هيئة التدريس",
    myPortal: "بوابة الطالب",
    login: "تسجيل الدخول",
    logout: "تسجيل خروج",
    heroTitle: "الإدارة الأكاديمية، ببساطة.",
    heroSubtitle: "منصة مركزية مصممة للمؤسسات التعليمية الحديثة في إقليم كردستان. إدارة سجلات الطلاب، وتتبع الحضور اليومي، وتبسيط سير عمل هيئة التدريس.",
    registerAccount: "تسجيل حساب",
    
    welcomeBack: "مرحباً بعودتك",
    signInTo: "تسجيل الدخول إلى نظام إدارة الطلاب",
    academicEmail: "البريد الإلكتروني الأكاديمي",
    password: "كلمة المرور",
    testRole: "دور النظام",
    authenticating: "جاري التحقق...",
    signInSecurely: "تسجيل الدخول بشكل آمن",
    createAccount: "إنشاء حساب",
    registerCreds: "سجل بيانات اعتمادك الجامعية الرسمية",
    firstName: "الاسم الأول",
    lastName: "اسم العائلة",
    univId: "رقم الهوية الجامعية",
    dept: "القسم",
    completeReg: "إكمال التسجيل",
    footerText: "برنامج تدريب زاس تك. مبني باستخدام React و TypeScript.",
    
    systemAdmin: "إدارة النظام",
    welcome: "أهلاً بك",
    dbSync: "مزامنة قاعدة البيانات نشطة",
    totalStudents: "إجمالي الطلاب المسجلين",
    activeFaculty: "أعضاء هيئة التدريس النشطين",
    registeredDepts: "الأقسام المسجلة",
    serverUptime: "وقت تشغيل الخادم",
    userDirectory: "دليل إدارة المستخدمين",
    fullName: "الاسم الكامل",
    emailAddr: "البريد الإلكتروني",
    department: "القسم",
    systemRole: "دور النظام",
    adminActions: "الإجراءات الإدارية",
    changeRole: "تغيير الدور",
    delete: "حذف",
    auditLog: "سجل تدقيق الأمان",
    
    facultyPortal: "بوابة هيئة التدريس",
    loggedInAs: "تم تسجيل الدخول باسم",
    studentId: "رقم الطالب",
    todayAttendance: "حضور اليوم",
    currentGrade: "الدرجة الحالية (%)",
    actions: "الإجراءات",
    update: "تحديث",
    present: "حاضر",
    absent: "غائب",
    late: "متأخر",
    
    studentPortal: "بوابة الطالب",
    cumGpa: "المعدل التراكمي (GPA)",
    creditsEarned: "الساعات المعتمدة",
    overallAttendance: "نسبة الحضور",
    currentCourses: "دورات الفصل الدراسي الحالي"
  }
};

const SettingsContext = createContext<SettingsContextType | null>(null);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('light');
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedTheme = localStorage.getItem('zas_theme') as Theme;
    const savedLang = localStorage.getItem('zas_lang') as Language;
    if (savedTheme) setTheme(savedTheme);
    if (savedLang) setLanguage(savedLang);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('zas_theme', theme);

    const dir = (language === 'ku' || language === 'ar') ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', language);
    localStorage.setItem('zas_lang', language);
  }, [theme, language]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');
  const changeLanguage = (lang: Language) => setLanguage(lang);
  
  // The Conversion Engine: Translates words AND automatically maps Western digits to Eastern Arabic digits
  const t = (key: string | number): string => {
    const stringKey = String(key);
    
    // Look up words in dictionaries
    const translatedText = translations[language][stringKey as keyof typeof translations['en']] || stringKey;
    
    // If language is English, return directly
    if (language === 'en') return translatedText;
    
    // If language is Kurdish or Arabic, map numbers to Eastern numeric systems
    return translatedText.replace(/[0-9]/g, (digit) => {
      return ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'][parseInt(digit)];
    });
  };

  return (
    <SettingsContext.Provider value={{ theme, language, toggleTheme, changeLanguage, t }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) throw new Error("useSettings must be used within a SettingsProvider");
  return context;
};