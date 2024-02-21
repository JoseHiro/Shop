class ChangeAuthorTypeInProducts < ActiveRecord::Migration[7.1]
  def change
    remove_column :products, :author
    add_reference :products, :author, foreign_key: { to_table: :users }
  end
end
