class CreateIdeas < ActiveRecord::Migration[5.1]
  def change
    create_table :ideas do |t|
      t.text :description
      t.string :author
      t.timestamps null: false
    end
  end
end