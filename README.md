# Proje Takip Sistemi  

Bu proje, birden fazla görevi projelere ekleyebilen ve görevlerin durumlarını izleyebilen bir sistemdir. Proje, kullanıcıların yeni projeler oluşturmasına, bu projelere görev eklemesine ve görevleri düzenlemesine olanak sağlar.

## Amaç  
- Bir projeye birden fazla görev ekleyebilmek  
- Proje ve görevlerin durumlarını takip etmek  
- Kullanıcıların güvenli giriş yaparak projeleri yönetebilmesi  

## Gereksinimler  
- Kimlik doğrulama sistemi (JWT ile)  
- Kullanıcılar proje ekleyebilmeli ve projelere görev tanımlayabilmeli  
- Proje ve görevlerin başlangıç/bitiş tarihleri ile durumları izlenebilmeli  

## Teknolojiler  
### Backend  
- **ASP.NET Core**: API geliştirme  
- **Entity Framework Core**: ORM aracı  
- **MSSQL**: Veritabanı yönetimi  
- **AutoMapper**: Nesne dönüşümleri  
- **JWT**: Kimlik doğrulama  

### Frontend  
- **React**: Kullanıcı arayüzü geliştirme  
- **Redux**: Durum yönetimi  
- **Axios**: API iletişimi  
- **Bootstrap**: UI bileşenleri  

## Veri Yapısı  
### Projeler  
- **ID**: Projenin benzersiz kimliği (otomatik)  
- **Proje Adı**: Zorunlu alan  
- **Başlangıç Tarihi**: Zorunlu alan  
- **Bitiş Tarihi**: Zorunlu alan  

### Görevler  
- **ID**: Görevin benzersiz kimliği (otomatik)  
- **Proje ID**: Görevin ait olduğu proje (foreign key)  
- **Başlık**: Zorunlu alan  
- **Açıklama**: Opsiyonel  
- **Oluşturulma Tarihi**: Otomatik atanır  
- **Durum**: Zorunlu (new, in_progress, completed)  

## İşlevler  
1. **Proje Oluşturma**  
   - Kullanıcı, proje adı, başlangıç ve bitiş tarihini girer.  
   - "Proje Oluştur" butonuna basarak yeni proje ekler.  

2. **Görev Ekleme ve İlişkilendirme**  
   - Kullanıcılar projelere görev ekler ve proje seçimi yapar.  
   - Görev, oluşturulma tarihi ve durumu ile kaydedilir.  

3. **Görev Düzenleme ve Silme**  
   - Kullanıcılar görevleri düzenleyebilir veya silebilir.  
   - Görev durumu güncellenebilir.  

4. **Proje ve Görev Listesi**  
   - Projeler ve görevler, proje adı ve görev durumuna göre listelenir.  
   - Her görev için başlık, açıklama, oluşturulma tarihi ve durum görüntülenir.  

## Veritabanı Tasarımı  
### Projeler Tablosu (Projects)  
| Alan Adı   | Veri Tipi  | Açıklama                     |  
|------------|------------|------------------------------|  
| id         | INT        | Benzersiz kimlik (PK)        |  
| name       | VARCHAR    | Proje adı (Not Null)         |  
| start_date | DATE       | Başlangıç tarihi (Not Null)  |  
| end_date   | DATE       | Bitiş tarihi (Not Null)      |  

### Görevler Tablosu (Tasks)  
| Alan Adı      | Veri Tipi        | Açıklama                          |  
|---------------|------------------|-----------------------------------|  
| id            | INT              | Benzersiz kimlik (PK)             |  
| project_id    | INT (Foreign Key)| İlgili proje ID’si                |  
| title         | VARCHAR          | Görev başlığı (Not Null)          |  
| description   | TEXT             | Görev açıklaması (Opsiyonel)      |  
| creation_date | DATETIME         | Oluşturulma tarihi (Not Null)     |  
| status        | ENUM             | Durum (new, in_progress, completed) |  

## Kullanıcı Arayüzü  
1. **Proje Oluşturma Formu**  
   - Proje adı, başlangıç tarihi ve bitiş tarihi alanları bulunur.  
   - "Proje Oluştur" butonu ile proje eklenir.  

2. **Proje Detayları ve Görev Listesi Ekranı**  
   - Proje bilgileri ve projeye bağlı görevler listelenir.  
   - Görevler düzenlenebilir ve silinebilir.  

## Kurulum  
1. **Backend Kurulumu:**  
   - Projeyi klonlayın:  
     ```bash
     git clone <backend-repository-url>
     ```
   - MSSQL veritabanı bağlantısını `appsettings.json` dosyasında yapılandırın.  
   - Bağımlılıkları yükleyin:  
     ```bash
     dotnet restore
     ```
   - Veritabanı migrasyonu çalıştırın:  
     ```bash
     dotnet ef database update
     ```
   - Uygulamayı başlatın:  
     ```bash
     dotnet run --project WebAPI
     ```

2. **Frontend Kurulumu:**  
   - Projeyi klonlayın:  
     ```bash
     git clone <frontend-repository-url>
     ```
   - Bağımlılıkları yükleyin:  
     ```bash
     npm install
     ```
   - Uygulamayı başlatın:  
     ```bash
     npm start
     ```

## Katkıda Bulunma  
Herhangi bir katkıda bulunmak için **Pull Request** oluşturun.  


