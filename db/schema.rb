# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180220223911) do

  create_table "attendees", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.bigint "faculty_id"
    t.bigint "workshop_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["faculty_id"], name: "index_attendees_on_faculty_id"
    t.index ["workshop_id"], name: "index_attendees_on_workshop_id"
  end

  create_table "consortia", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string "name"
    t.string "state"
    t.bigint "admin_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["admin_id"], name: "index_consortia_on_admin_id"
    t.index ["name"], name: "index_consortia_on_name", unique: true
    t.index ["state"], name: "index_consortia_on_state"
  end

  create_table "institutions", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string "name"
    t.string "address_line_1"
    t.string "address_line_2"
    t.string "city"
    t.string "state"
    t.integer "zip"
    t.bigint "consortium_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["consortium_id"], name: "index_institutions_on_consortium_id"
    t.index ["name"], name: "index_institutions_on_name", unique: true
  end

  create_table "users", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "first_name", default: "", null: false
    t.string "last_name", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.string "provider"
    t.string "uid"
    t.bigint "institution_id"
    t.integer "role", default: 0
    t.string "type"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["first_name"], name: "index_users_on_first_name"
    t.index ["institution_id"], name: "index_users_on_institution_id"
    t.index ["last_name"], name: "index_users_on_last_name"
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  create_table "workshops", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string "name"
    t.string "description"
    t.bigint "institution_id"
    t.string "additional_location_info"
    t.datetime "starts_at"
    t.float "duration", limit: 24
    t.float "stipend", limit: 24
    t.datetime "sign_up_deadline"
    t.integer "attendee_limit"
    t.string "review_deadline"
    t.bigint "facilitator_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["facilitator_id"], name: "index_workshops_on_facilitator_id"
    t.index ["institution_id"], name: "index_workshops_on_institution_id"
    t.index ["name"], name: "index_workshops_on_name"
    t.index ["starts_at"], name: "index_workshops_on_starts_at"
  end

  add_foreign_key "attendees", "workshops"
  add_foreign_key "institutions", "consortia"
  add_foreign_key "workshops", "institutions"
end
