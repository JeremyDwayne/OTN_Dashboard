class Consortium < ApplicationRecord
  extend FriendlyId
  friendly_id :name, use: :slugged

  has_many :institutions
  belongs_to :admin, foreign_key: "admin_id", primary_key: "id"
end
