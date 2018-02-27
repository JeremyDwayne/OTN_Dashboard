class AddSlugToConsortiumInstitutionWorkshops < ActiveRecord::Migration[5.1]
  def change
    add_column :consortia, :slug, :string, unique: true, index: true
    add_column :institutions, :slug, :string, unique: true, index: true
    add_column :workshops, :slug, :string, unique: true, index: true
  end
end
