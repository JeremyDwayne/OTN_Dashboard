class CreateWorkshops < ActiveRecord::Migration[5.1]
  def change
    create_table :workshops do |t|
      t.string :name
      t.string :description
      t.references :institutions, foreign_key: true, index: true
      t.string :additional_location_info
      t.datetime :starts_at
      t.float :duration
      t.float :stipend
      t.datetime :sign_up_deadline
      t.integer :attendee_limit
      t.string :review_deadline

      t.timestamps
    end
    add_index :workshops, :name
    add_index :workshops, :starts_at
  end
end
