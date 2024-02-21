class ChangeAuthorIdToUserIdInProducts < ActiveRecord::Migration[7.1]
  def change
    rename_column :products, :author_id, :user_id
  end
end
