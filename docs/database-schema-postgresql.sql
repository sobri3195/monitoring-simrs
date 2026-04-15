-- Database Schema: Sistem Laporan Inti Faskes Puskesau TNI AU
-- Rekomendasi: PostgreSQL

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 2.1 Enum utama
CREATE TYPE user_role AS ENUM (
  'SUPER_ADMIN_PUSKESAU',
  'ADMIN_KOTAMA',
  'OPERATOR_FASKES',
  'VIEWER_PIMPINAN'
);

CREATE TYPE facility_type AS ENUM ('RSAU', 'FKTP');

CREATE TYPE facility_category AS ENUM ('BLU', 'PNBP', 'FKTP');

CREATE TYPE report_status AS ENUM (
  'DRAFT',
  'DIKIRIM',
  'DIREVIEW',
  'PERLU_REVISI',
  'DISETUJUI_KOTAMA',
  'TERVALIDASI_PUSKESAU'
);

CREATE TYPE implementation_stage AS ENUM (
  'BELUM_MULAI',
  'PERSIAPAN',
  'PENGADAAN',
  'INSTALASI',
  'KONFIGURASI',
  'PELATIHAN',
  'UJI_COBA',
  'OPERASIONAL_TERBATAS',
  'BERJALAN',
  'STABILISASI'
);

CREATE TYPE integration_status AS ENUM (
  'BELUM_MULAI',
  'PROSES',
  'BERHASIL',
  'TERKENDALA',
  'TIDAK_RELEVAN'
);

CREATE TYPE risk_level AS ENUM ('RENDAH', 'SEDANG', 'TINGGI');

CREATE TYPE issue_status AS ENUM ('OPEN', 'ON_PROGRESS', 'CLOSED');

CREATE TYPE review_level AS ENUM ('KOTAMA', 'PUSKESAU');

CREATE TYPE hosting_model AS ENUM ('CLOUD', 'ON_PREMISE', 'HYBRID', 'TIDAK_ADA');

-- 2.2 Tabel master
CREATE TABLE kotamas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(150) NOT NULL,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  updated_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE facilities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(200) NOT NULL,
  facility_type facility_type NOT NULL,
  category facility_category NOT NULL,
  kotama_id UUID REFERENCES kotamas(id),
  lanud_satuan VARCHAR(200),
  class_tni_au VARCHAR(50),
  class_kemenkes VARCHAR(50),
  pic_name VARCHAR(150),
  pic_position VARCHAR(150),
  pic_phone VARCHAR(50),
  pic_email VARCHAR(150),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  updated_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name VARCHAR(150) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role user_role NOT NULL,
  kotama_id UUID REFERENCES kotamas(id),
  facility_id UUID REFERENCES facilities(id),
  is_active BOOLEAN NOT NULL DEFAULT true,
  last_login_at TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  updated_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE report_periods (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  label VARCHAR(100) NOT NULL,
  period_month INT,
  period_year INT,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  due_date DATE NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  updated_at TIMESTAMP NOT NULL DEFAULT now()
);

-- 2.3 Tabel transaksi inti
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  facility_id UUID NOT NULL REFERENCES facilities(id),
  period_id UUID NOT NULL REFERENCES report_periods(id),
  submitted_by UUID REFERENCES users(id),
  status report_status NOT NULL DEFAULT 'DRAFT',
  summary_status TEXT,
  implementation_stage implementation_stage,
  progress_percent INT NOT NULL DEFAULT 0 CHECK (progress_percent >= 0 AND progress_percent <= 100),
  application_name VARCHAR(200),
  vendor_name VARCHAR(200),
  hosting_model hosting_model NOT NULL DEFAULT 'TIDAK_ADA',

  readiness_sdm SMALLINT DEFAULT 0 CHECK (readiness_sdm BETWEEN 0 AND 100),
  readiness_network SMALLINT DEFAULT 0 CHECK (readiness_network BETWEEN 0 AND 100),
  readiness_devices SMALLINT DEFAULT 0 CHECK (readiness_devices BETWEEN 0 AND 100),
  readiness_data SMALLINT DEFAULT 0 CHECK (readiness_data BETWEEN 0 AND 100),
  readiness_training SMALLINT DEFAULT 0 CHECK (readiness_training BETWEEN 0 AND 100),

  main_issue TEXT,
  main_risk TEXT,
  risk_level risk_level NOT NULL DEFAULT 'SEDANG',
  support_needed TEXT,
  support_type TEXT,
  followup_plan TEXT,
  followup_target_date DATE,
  target_go_live DATE,
  actual_go_live DATE,
  additional_notes TEXT,

  last_submitted_at TIMESTAMP,
  reviewed_at TIMESTAMP,
  validated_at TIMESTAMP,

  created_at TIMESTAMP NOT NULL DEFAULT now(),
  updated_at TIMESTAMP NOT NULL DEFAULT now(),

  UNIQUE (facility_id, period_id)
);

CREATE TABLE report_integrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  report_id UUID NOT NULL REFERENCES reports(id) ON DELETE CASCADE,
  integration_key VARCHAR(50) NOT NULL,
  status integration_status NOT NULL DEFAULT 'BELUM_MULAI',
  notes TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  updated_at TIMESTAMP NOT NULL DEFAULT now(),
  UNIQUE (report_id, integration_key)
);

-- Nilai integration_key:
-- SATUSEHAT
-- BPJS
-- LIS
-- RISPACS
-- ANTRIAN

CREATE TABLE report_checklists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  report_id UUID NOT NULL REFERENCES reports(id) ON DELETE CASCADE,
  item_key VARCHAR(100) NOT NULL,
  item_label VARCHAR(200) NOT NULL,
  is_checked BOOLEAN NOT NULL DEFAULT false,
  notes TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  updated_at TIMESTAMP NOT NULL DEFAULT now(),
  UNIQUE (report_id, item_key)
);

-- Contoh item_key:
-- SDM_SIAP
-- JARINGAN_SIAP
-- PERANGKAT_SIAP
-- DATA_SIAP
-- PELATIHAN_SELESAI

CREATE TABLE report_issues (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  report_id UUID NOT NULL REFERENCES reports(id) ON DELETE CASCADE,
  category VARCHAR(50) NOT NULL,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  risk_level risk_level NOT NULL DEFAULT 'SEDANG',
  status issue_status NOT NULL DEFAULT 'OPEN',
  target_resolution_date DATE,
  action_plan TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  updated_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE report_attachments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  report_id UUID NOT NULL REFERENCES reports(id) ON DELETE CASCADE,
  file_name VARCHAR(255) NOT NULL,
  file_path TEXT NOT NULL,
  mime_type VARCHAR(100),
  file_size BIGINT,
  uploaded_by UUID REFERENCES users(id),
  created_at TIMESTAMP NOT NULL DEFAULT now()
);

-- 2.4 Review, validasi, dan audit
CREATE TABLE report_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  report_id UUID NOT NULL REFERENCES reports(id) ON DELETE CASCADE,
  review_level review_level NOT NULL,
  reviewer_id UUID NOT NULL REFERENCES users(id),
  action VARCHAR(50) NOT NULL,
  notes TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT now()
);

-- Contoh action:
-- COMMENT
-- REQUEST_REVISION
-- APPROVE
-- VALIDATE
-- ESCALATE

CREATE TABLE report_status_histories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  report_id UUID NOT NULL REFERENCES reports(id) ON DELETE CASCADE,
  old_status report_status,
  new_status report_status NOT NULL,
  changed_by UUID REFERENCES users(id),
  notes TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  related_entity_type VARCHAR(50),
  related_entity_id UUID,
  created_at TIMESTAMP NOT NULL DEFAULT now()
);

-- 2.5 Relationship summary
-- kotamas 1 : N facilities
-- kotamas 1 : N users
-- facilities 1 : N reports
-- report_periods 1 : N reports
-- reports 1 : N report_integrations
-- reports 1 : N report_checklists
-- reports 1 : N report_issues
-- reports 1 : N report_attachments
-- reports 1 : N report_reviews
-- reports 1 : N report_status_histories

-- 2.6 Index yang wajib
CREATE INDEX idx_facilities_kotama ON facilities(kotama_id);
CREATE INDEX idx_reports_facility ON reports(facility_id);
CREATE INDEX idx_reports_period ON reports(period_id);
CREATE INDEX idx_reports_status ON reports(status);
CREATE INDEX idx_reports_risk_level ON reports(risk_level);
CREATE INDEX idx_report_issues_status ON report_issues(status);
CREATE INDEX idx_notifications_user_read ON notifications(user_id, is_read);
