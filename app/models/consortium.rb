class Consortium < ApplicationRecord
  has_many :institutions
  has_one :admin, foreign_key: "id"
end
