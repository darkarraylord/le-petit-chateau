class AddDisableAndHideFlagToEstates < ActiveRecord::Migration[5.1]
  def change
    add_column :estates, :disable, :boolean, null: false, default: false
    add_column :estates, :hide, :boolean, null: false, default: false
  end
end
