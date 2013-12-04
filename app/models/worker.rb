class Worker < ActiveRecord::Base

has_many :appointments
accepts_nested_attributes_for :appointments

def with_blank_appointment
	appointments.build
	self
end	


		
end
