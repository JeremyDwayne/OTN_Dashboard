class CreateInstitutions < ActiveRecord::Migration[5.1]
  def change
    create_table :institutions do |t|
      t.string :name
      t.string :address_line_1
      t.string :address_line_2
      t.string :city
      t.string :state
      t.integer :zip
      t.references :consortia, foreign_key: true, index: true

      t.timestamps
    end
    add_index :institutions, :name, unique: true
  end
end
