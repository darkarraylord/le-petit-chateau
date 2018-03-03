class CreateEstateAmenities < ActiveRecord::Migration[5.1]
  def change
    create_table :estate_amenities do |t|
      t.belongs_to :estate, foreign_key: true
      t.belongs_to :amenity, foreign_key: true

      t.timestamps
    end
  end
end
