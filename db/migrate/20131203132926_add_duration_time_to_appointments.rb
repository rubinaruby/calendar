class AddDurationTimeToAppointments < ActiveRecord::Migration
  def change
  	add_column :appointments, :duration_time, :time
  end
end
