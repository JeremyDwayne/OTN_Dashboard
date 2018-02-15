class Institution < ApplicationRecord
  belongs_to :consortium
  has_many :workshops
  has_many :facilitators, class_name: "User", primary_key: "id"
  has_many :faculty, class_name: "User", primary_key: "id"
end
