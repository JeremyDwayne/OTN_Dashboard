class AddInvitedWorkshopIdToUser < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :invited_workshop_id, :integer
  end
end
