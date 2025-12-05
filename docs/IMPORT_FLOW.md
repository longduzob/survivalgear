# Product Import Flow - Visual Guide

## 🔄 Complete Import Process

### Step 1: Admin Access
```
User (Admin) → Login → Dashboard (/admin)
                           ↓
                   Click "Import" Button
                           ↓
                   Import Page (/admin/import)
```

### Step 2: Paste URLs
```
┌─────────────────────────────────────────┐
│  Textarea                               │
│  ┌───────────────────────────────────┐ │
│  │ https://aliexpress.com/item/1.html│ │
│  │ https://aliexpress.com/item/2.html│ │
│  │ https://aliexpress.com/item/3.html│ │
│  └───────────────────────────────────┘ │
│                                         │
│  [ 🚀 Importer les produits ]          │
└─────────────────────────────────────────┘
```

### Step 3: Frontend Processing
```javascript
// Client-side validation
urls.split('\n')
  → Filter empty lines
  → Validate AliExpress URLs
  → Check max 50 URLs
  → POST to API
```

### Step 4: API Processing

```
POST /api/admin/import
  ↓
┌─────────────────────────────────────┐
│ 1. Check Authentication             │
│    ✓ Is user logged in?             │
│    ✓ Is role === ADMIN?             │
└──────────┬──────────────────────────┘
           ↓
┌─────────────────────────────────────┐
│ 2. Validate Request                 │
│    ✓ URLs array present?            │
│    ✓ Array not empty?               │
│    ✓ Max 50 URLs?                   │
└──────────┬──────────────────────────┘
           ↓
┌─────────────────────────────────────┐
│ 3. Process Each URL                 │
│    For each URL:                    │
│      → Create ImportLog (PENDING)   │
│      → Scrape product data          │
│      → Validate data                │
│      → Calculate price              │
│      → Create/get category          │
│      → Generate unique slug         │
│      → Create product               │
│      → Create images                │
│      → Update ImportLog (SUCCESS)   │
└──────────┬──────────────────────────┘
           ↓
┌─────────────────────────────────────┐
│ 4. Return Results                   │
│    {                                │
│      success: true,                 │
│      results: [...],                │
│      summary: {                     │
│        total, succeeded, failed     │
│      }                              │
│    }                                │
└─────────────────────────────────────┘
```

### Step 5: Database Operations

```sql
-- For each successful import:

1. INSERT INTO ImportLog
   (sourceUrl, status='PENDING')

2. INSERT INTO Product
   (name, slug, price, basePrice, sourceUrl, ...)

3. INSERT INTO ProductImage
   (productId, url, alt, order)
   -- Multiple rows for each image

4. UPDATE ImportLog
   SET status='SUCCESS',
       productName=...,
       basePrice=...,
       sellingPrice=...,
       margin=...
```

### Step 6: Price Calculation

```typescript
Input: basePrice = 20.00 EUR

    ↓

Determine multiplier:
  if (basePrice <= 10)      → 3.0x - 2.9x
  else if (basePrice <= 30) → 2.5x  ← Our case
  else if (basePrice < 100) → 2.0x
  else                      → 1.5-1.7x

    ↓

Apply multiplier:
  price = 20.00 * 2.5 = 50.00

    ↓

Round to .99:
  rounded = Math.round(50.00) = 50
  final = 50 - 0.01 = 49.99

    ↓

Output: sellingPrice = 49.99 EUR
        margin = 150.0%
```

### Step 7: Frontend Display

```
Progress Updates:
┌─────────────────────────────────────────┐
│ 📊 Progression: ████████░ 2/3          │
│                                         │
│ ✅ Product 1                            │
│    8.50€ → 24.99€ (+194.0%)            │
│                                         │
│ ✅ Product 2                            │
│    20.00€ → 49.99€ (+150.0%)           │
│                                         │
│ ⏳ Product 3                            │
│    En cours...                          │
└─────────────────────────────────────────┘
```

## 🔍 Data Flow Diagram

```
┌──────────┐
│  Admin   │
│   User   │
└────┬─────┘
     │ 1. Paste URLs
     ↓
┌──────────────────┐
│  Frontend UI     │
│  /admin/import   │
└────┬─────────────┘
     │ 2. POST /api/admin/import
     ↓
┌──────────────────┐      ┌──────────────┐
│   API Route      │──3.→ │  Auth Check  │
│   route.ts       │      └──────────────┘
└────┬─────────────┘
     │ 4. Process URLs
     ↓
┌──────────────────┐      ┌──────────────┐
│  Scraper Lib     │──5.→ │  AliExpress  │
│  scraper.ts      │      │  (Mock)      │
└────┬─────────────┘      └──────────────┘
     │ 6. Product Data
     ↓
┌──────────────────┐
│  Pricing Lib     │
│  pricing.ts      │
│  (Calculate $)   │
└────┬─────────────┘
     │ 7. Selling Price
     ↓
┌──────────────────┐      ┌──────────────┐
│  Prisma ORM      │──8.→ │  PostgreSQL  │
│  Database Ops    │      │  Database    │
└────┬─────────────┘      └──────────────┘
     │ 9. Created Products
     ↓
┌──────────────────┐
│  API Response    │
│  { results }     │
└────┬─────────────┘
     │ 10. JSON Response
     ↓
┌──────────────────┐
│  Frontend UI     │
│  Display Results │
└──────────────────┘
```

## 🗄️ Database Schema

```
┌─────────────────────────────────────────────────┐
│                 Product                         │
├─────────────────────────────────────────────────┤
│ id              String (PK)                     │
│ name            String                          │
│ slug            String (Unique)                 │
│ description     String                          │
│ price           Float       ← Calculated price  │
│ basePrice       Float       ← Original price    │
│ sourceUrl       String      ← AliExpress URL    │
│ categoryId      String (FK)                     │
│ stock           Int                             │
│ active          Boolean                         │
│ ...                                             │
└─────────────────────────────────────────────────┘
          ↓ 1:N
┌─────────────────────────────────────────────────┐
│              ProductImage                       │
├─────────────────────────────────────────────────┤
│ id              String (PK)                     │
│ productId       String (FK)                     │
│ url             String                          │
│ alt             String                          │
│ order           Int                             │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│               ImportLog                         │
├─────────────────────────────────────────────────┤
│ id              String (PK)                     │
│ sourceUrl       String                          │
│ productName     String?                         │
│ basePrice       Float?                          │
│ sellingPrice    Float?                          │
│ margin          Float?                          │
│ status          ImportStatus (enum)             │
│ errorMessage    String?                         │
│ createdAt       DateTime                        │
│ updatedAt       DateTime                        │
└─────────────────────────────────────────────────┘
```

## 📊 State Machine

```
Import Process State Machine:

  ┌─────────┐
  │  START  │
  └────┬────┘
       │
       ↓
  ┌─────────┐
  │ PENDING │ ← ImportLog created
  └────┬────┘
       │
       ├─── Success ───→ ┌─────────┐
       │                 │ SUCCESS │
       │                 └─────────┘
       │
       └─── Failure ───→ ┌─────────┐
                         │ FAILED  │
                         └─────────┘
```

## 🎯 User Journey

### Happy Path
```
1. Admin logs in
   ↓
2. Clicks "Import" in dashboard
   ↓
3. Pastes 5 AliExpress URLs
   ↓
4. Clicks "Importer"
   ↓
5. Sees loading spinner
   ↓
6. Sees progress bar filling
   ↓
7. Sees success messages appear
   ↓
8. All 5 products imported successfully
   ↓
9. Can view products in catalog
```

### Error Path
```
1. Admin pastes invalid URL
   ↓
2. Frontend validates: ❌ Not AliExpress
   ↓
3. Alert shown: "Invalid URL"
   ↓
4. User corrects URL
   ↓
5. Clicks "Importer" again
   ↓
6. One product fails to scrape
   ↓
7. Shows ❌ with error message
   ↓
8. Other products succeed
   ↓
9. Summary: 4/5 succeeded
```

## 🔐 Security Layers

```
1. Frontend Validation
   ├─ URL format check
   ├─ AliExpress domain check
   └─ Max 50 URLs limit

2. API Authentication
   ├─ Session check (NextAuth)
   ├─ Role check (ADMIN only)
   └─ Rate limiting

3. Database Security
   ├─ Prisma ORM (SQL injection protection)
   ├─ Type validation
   └─ Transaction safety

4. Error Handling
   ├─ Try-catch blocks
   ├─ Error logging
   └─ Graceful failures
```

## 📈 Performance Considerations

### Current Implementation
- **Sequential Processing**: One URL at a time
- **Synchronous**: API waits for all imports
- **Timeout**: 30 seconds per request typical

### Future Optimizations
```
Sequential (Current)
URL 1 ──────→ [5s]
URL 2 ──────→ [5s]
URL 3 ──────→ [5s]
Total: 15 seconds

Parallel (Future)
URL 1 ──────→ [5s]
URL 2 ──────→ [5s]  ← All at once
URL 3 ──────→ [5s]
Total: 5 seconds
```

## 🎨 UI States

### 1. Initial State
```
[ Empty textarea ]
[ Disabled Import button ]
```

### 2. Ready State
```
[ Textarea with URLs ]
[ Active Import button ]
```

### 3. Loading State
```
[ Disabled textarea ]
[ Loading spinner on button ]
[ "Importation en cours..." ]
```

### 4. Results State
```
[ Enabled textarea ]
[ Progress bar ]
[ List of results with ✅/❌ ]
[ Summary statistics ]
```

---

**This flow demonstrates the complete journey from user action to database storage, with all validation, security, and error handling layers in place.**
