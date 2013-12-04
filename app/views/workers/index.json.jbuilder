json.array!(@workers) do |worker|
  json.extract! worker, :start_time, :end_time, :slot_minutes
  json.url worker_url(worker, format: :json)
end
