class CreateEstates < ActiveRecord::Migration[5.1]
  def change
    create_table :estates do |t|
      t.string :name
      t.text :description
      t.string :location
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
