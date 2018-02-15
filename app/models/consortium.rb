class Consortium < ApplicationRecord
  has_many :institutions
  has_one :primary_contact, class_name: "User", foreign_key: "primary_contact_id", primary_key: "id"
end
