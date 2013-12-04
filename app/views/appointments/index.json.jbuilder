json.array!(@appointments) do |appointment|
  json.extract! appointment, :title, :start_time, :end_time, :appointment_date, :description
  json.url appointment_url(appointment, format: :json)
end
