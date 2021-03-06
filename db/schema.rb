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

ActiveRecord::Schema.define(version: 20190221082425) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "comments", force: :cascade do |t|
    t.text "body"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "author_id"
    t.integer "post_id"
  end

  create_table "friendships", force: :cascade do |t|
    t.integer "requested_id"
    t.integer "requesting_id"
    t.boolean "accepted", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["requested_id", "requesting_id"], name: "index_friendships_on_requested_id_and_requesting_id", unique: true
    t.index ["requested_id"], name: "index_friendships_on_requested_id"
    t.index ["requesting_id"], name: "index_friendships_on_requesting_id"
  end

  create_table "likes", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "author_id"
    t.integer "post_id"
    t.boolean "positive", default: true
  end

  create_table "posts", force: :cascade do |t|
    t.string "body"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "author_id"
    t.string "smallImageUrl"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "provider"
    t.string "uid"
    t.string "breed"
    t.date "birthday"
    t.string "country"
    t.string "city"
    t.string "things_i_like", array: true
    t.string "things_i_hate", array: true
    t.string "small_profile_pic"
    t.string "small_cover_pic"
    t.string "cropped_profile_pic"
    t.string "cropped_cover_pic"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["name"], name: "index_users_on_name", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "comments", "posts"
  add_foreign_key "comments", "users", column: "author_id"
  add_foreign_key "friendships", "users", column: "requested_id"
  add_foreign_key "friendships", "users", column: "requesting_id"
  add_foreign_key "likes", "posts"
  add_foreign_key "likes", "users", column: "author_id"
  add_foreign_key "posts", "users", column: "author_id"
end
