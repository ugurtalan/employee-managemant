const users = [
  {
    id: 1,
    name: "Ahmet Yılmaz",
    role: "employee",
    username: "ahmo",
    password: "1234",
    records: [
      {
        date: "2025-03-15",
        startTime: "09:00",
        endTime: "17:00",
        topics: "API entegrasyonu",
        detail: "API entegrasyonu görevi tamamlandı, hiçbir nokta atlanmadı."
      },
    ],
  },
  {
    id: 2,
    name: "Ayşe Demir",
    role: "employee",
    username: "aydemir",
    password: "1234",
    records: [
      {
        date: "2025-03-16",
        startTime: "10:00",
        endTime: "18:00",
        topics: "Veritabanı optimizasyonu",
        detail: "Veritabanı sorguları hızlandırıldı ve performans arttırıldı."
      },
      {
        date: "2025-03-17",
        startTime: "09:30",
        endTime: "17:30",
        topics: "API güvenliği",
        detail: "API'lerin güvenlik önlemleri iyileştirildi."
      },
    ],
  },
  {
    id: 3,
    name: "Mehmet Kaya",
    role: "employee",
    username: "mehmetk",
    password: "1234",
    records: [
      {
        date: "2025-03-17",
        startTime: "08:30",
        endTime: "16:30",
        topics: "Frontend geliştirme",
        detail: "HTML, CSS ve JavaScript ile yeni sayfa tasarımı tamamlandı."
      },
      {
        date: "2025-03-18",
        startTime: "10:00",
        endTime: "14:00",
        topics: "React.js uygulama geliştirme",
        detail: "React.js ile bileşen tabanlı uygulama geliştirildi."
      },
      {
        date: "2025-03-19",
        startTime: "09:00",
        endTime: "17:00",
        topics: "UI/UX Tasarım",
        detail: "Yeni kullanıcı arayüzü tasarımı tamamlandı."
      },
    ],
  },
  {
    id: 4,
    name: "Elif Arslan",
    role: "employee",
    username: "elifarslan",
    password: "1234",
    records: [
      {
        date: "2025-03-15",
        startTime: "08:30",
        endTime: "16:30",
        topics: "Backend geliştirme",
        detail: "Yeni API'ler oluşturuldu ve testler tamamlandı."
      },
      {
        date: "2025-03-16",
        startTime: "09:00",
        endTime: "17:00",
        topics: "Veritabanı yönetimi",
        detail: "Veritabanı yedekleme ve restore işlemleri yapıldı."
      },
      {
        date: "2025-03-17",
        startTime: "08:45",
        endTime: "16:45",
        topics: "DevOps altyapı yönetimi",
        detail: "CI/CD pipeline'ları oluşturuldu ve test edildi."
      },
      {
        date: "2025-03-18",
        startTime: "10:00",
        endTime: "18:00",
        topics: "Microservices geliştirme",
        detail: "Microservices yapısına geçiş işlemleri başlatıldı."
      },
    ],
  },
  {
    id: 5,
    name: "Can Öztürk",
    role: "employee",
    username: "canzturk",
    password: "1234",
    records: [
      {
        date: "2025-03-19",
        startTime: "08:00",
        endTime: "16:00",
        topics: "E-ticaret platformu geliştirme",
        detail: "E-ticaret platformunun ödeme entegrasyonu yapıldı."
      },
      {
        date: "2025-03-20",
        startTime: "09:00",
        endTime: "17:00",
        topics: "Kullanıcı doğrulama",
        detail: "OAuth 2.0 ile kullanıcı doğrulama işlemleri yapıldı."
      },
    ],
  },
  {
    id: 6,
    name: "Zeynep Yıldız",
    role: "employee",
    username: "zeynyildiz",
    password: "1234",
    records: [
      {
        date: "2025-03-20",
        startTime: "08:30",
        endTime: "16:30",
        topics: "Blockchain geliştirme",
        detail: "Blockchain uygulamaları için temel yapılar oluşturuldu."
      },
    ],
  },
];

const admins = [
  {
    id: 1,
    name: "Uğur Talan",
    role: "Manager",
    username: "utalan",
    password: "1234",
  },
  {
    id: 2,
    name: "Murat Tekin",
    role: "Manager",
    username: "mtekin",
    password: "1234",
  },
];

module.exports = { users, admins };
