class CreateAppointments < ActiveRecord::Migration
  def change
    create_table :appointments do |t|
      t.string :title
      t.time :start_time
      t.time :end_time
      t.date :appointment_date
      t.text :description
      t.belongs_to :worker
      t.timestamps
    end
  end
end
