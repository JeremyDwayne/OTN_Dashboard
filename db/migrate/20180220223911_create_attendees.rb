class CreateAttendees < ActiveRecord::Migration[5.1]
  def change
    create_table :attendees do |t|
      t.references :faculty
      t.references :workshop, foreign_key: true, index: true

      t.timestamps
    end
  end
end
