class Appointment < ActiveRecord::Base
	belongs_to :worker
	#before_create :event_duration
	
#	validates :title, presence: true

#	validates :start_time, :presence => { :message => "must be a valid date/time" }
 # 	validates :end_time, :presence => {:message => "must be a valid date/time"}
  #	validate :start_must_be_before_end_time

  #	validate :appointment_date_cannot_be_in_the_past

  #	validates :description, presence: true
    
  def start_must_be_before_end_time
    errors.add(:start_time, "must be before end time") unless
       self.start_time < self.end_time
  end 

  def appointment_date_cannot_be_in_the_past
  	 errors.add(:appointment_date, "can't be in the past") if
      !self.appointment_date.blank? and Date.parse(self.appointment_date.to_s) < Date.today
  end	
	
	# private

	# def event_duration
	# 	self.duration_time = self.end_time - self.start_time
	# end	
end
