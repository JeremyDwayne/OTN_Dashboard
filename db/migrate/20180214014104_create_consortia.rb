class CreateConsortia < ActiveRecord::Migration[5.1]
  def change
    create_table :consortia do |t|
      t.string :name
      t.string :state
      t.references :admin, null: true

      t.timestamps
    end
    add_index :consortia, :name, unique: true
    add_index :consortia, :state

  end
end
