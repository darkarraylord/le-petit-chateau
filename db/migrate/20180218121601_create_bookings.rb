class CreateBookings < ActiveRecord::Migration[5.1]
  def change
    create_table :bookings do |t|
      t.references :user, foreign_key: true
      t.references :estate, foreign_key: true
      t.date :star_date
      t.date :end_date
      t.integer :total_cost

      t.timestamps
    end
  end
end
