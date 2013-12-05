class Appointment < ActiveRecord::Base
	belongs_to :worker
	before_create :event_duration
	
	private

	def event_duration
		self.duration_time = self.end_time - self.start_time
	end	
end
