# encoding: UTF-8
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

ActiveRecord::Schema.define(version: 20160504072046) do

  create_table "anuncios", primary_key: "idAnuncio", force: true do |t|
    t.string   "titulo"
    t.string   "texto"
    t.string   "foto"
    t.date     "vigencia"
    t.integer  "activo",     default: 1
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "link"
  end

  create_table "autores", primary_key: "idAutor", force: true do |t|
    t.string   "nombre",      limit: 100
    t.string   "informacion", limit: 1000
    t.string   "foto"
    t.string   "twitter"
    t.string   "facebook"
    t.string   "instagram"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "activo"
  end

  create_table "baners", primary_key: "idBaner", force: true do |t|
    t.string   "titulo"
    t.string   "subtitulo"
    t.string   "texto"
    t.string   "foto"
    t.date     "vigencia"
    t.integer  "activo",     default: 1
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "categorias", primary_key: "idCategoria", force: true do |t|
    t.string   "nombre"
    t.integer  "activo",     default: 1
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "comentarios", primary_key: "idComentario", force: true do |t|
    t.string   "titulo"
    t.string   "texto"
    t.date     "fecha"
    t.integer  "activo",     default: 1
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "configuraciones", primary_key: "idConfiguracion", force: true do |t|
    t.string   "facebook"
    t.string   "twitter"
    t.string   "instagram"
    t.string   "texto"
    t.string   "foto"
    t.integer  "activo",     default: 1
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "titulo"
    t.string   "telefono"
    t.string   "correo"
    t.string   "direccion"
  end

  create_table "especiales", primary_key: "idEspecial", force: true do |t|
    t.string   "titulo"
    t.string   "foto"
    t.date     "vigencia"
    t.integer  "activo",      default: 1
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "descripcion"
    t.string   "nombre"
  end

  create_table "especiales_detalles", primary_key: "idEspecialDetalle", force: true do |t|
    t.string   "latitud"
    t.string   "longitud"
    t.string   "texto"
    t.string   "nombre"
    t.string   "foto"
    t.integer  "activo",     default: 1, null: false
    t.date     "vigencia"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "idEspecial"
  end

  create_table "fotos_posts", primary_key: "idFotoPost", force: true do |t|
    t.integer  "idPost"
    t.string   "foto"
    t.integer  "activo",     default: 1
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "galerias", primary_key: "idGaleria", force: true do |t|
    t.integer  "idCategoria"
    t.string   "titulo"
    t.string   "video"
    t.string   "foto"
    t.integer  "tipo"
    t.date     "vigencia"
    t.integer  "activo",      default: 1
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "info"
    t.integer  "idEspecial"
  end

  create_table "posts", primary_key: "idPost", force: true do |t|
    t.integer  "idCategoria"
    t.string   "titulo"
    t.date     "fecha"
    t.text     "texto"
    t.string   "link"
    t.string   "foto"
    t.integer  "orden"
    t.integer  "activo",      default: 1
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "idAutor"
    t.integer  "idEspecial"
    t.string   "ubicacion"
  end

  create_table "posts_anuncios", primary_key: "idPostAnuncio", force: true do |t|
    t.integer  "idPost"
    t.integer  "idAnuncio"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "principal"
  end

  create_table "posts_fotos", primary_key: "idPostFoto", force: true do |t|
    t.integer  "idPost"
    t.integer  "idGaleria"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "usuarios", primary_key: "idUsuario", force: true do |t|
    t.string   "usuario"
    t.string   "nombre"
    t.string   "contrasenia"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
