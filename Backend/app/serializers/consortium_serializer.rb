class ConsortiumSerializer
  include FastJsonapi::ObjectSerializer

  attributes :name, :state, :admin_id, :slug, :created_at, :updated_at

  set_type :consortium
  has_many :institutions, serializer: :institution
  belongs_to :admin, serializer: :admin
end
