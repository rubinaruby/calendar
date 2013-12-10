$(document).ready(function()
{
  alert('document load');
 var event_index=0;
 var slotHeight=$('tbody tr').height();

renderCalendar();
function renderCalendar()
{
alert('function call for render');
$.ajax({
            type: "GET",        
            url:"/workers",
            dataType: "json",
            success:function(result){
        
           
          for(i=0;i<result.length;i++)
          {
                 for(j=0;j<result[i].length;j++)
                 {
                 
                  
                  alert('appointments title is '+result[i][j].title);
                  var timeid=gettime(result[i][j].start_time);
                  var endtime=gettime(result[i][j].end_time);
                  var s_time=parseInt(getHour(timeid));
                  var e_time=parseInt(getHour(endtime));
                  var s_mins=parseInt(getMinute(timeid));
                  var e_mins=parseInt(getMinute(endtime));

                
                 // alert('duration is '+(e_time-s_time));
                 
                 var start_time_in_min=(s_time*60)+s_mins;
                 var end_time_in_min=(e_time*60)+e_mins;
                

                 var difference=end_time_in_min-start_time_in_min;

                 var no_slot=difference/30;

             
                  var h=$('.row-'+timeid).height();
                 // $('.emp'+result[i][j].worker_id+'-'+timeid).append("<div class='event ui-draggable' style='height:"+h+"px '>"+result[i][j].title+" </div>");
                   var prev_row=$('#timesheet  .row-'+timeid).prevAll().length;
                  //alert('for eveent '+result[i][j].title+' ,count is '+ $('#timesheet  .row-'+timeid).prevAll().length);
                  var topval=(prev_row*h)+20;
                  var percolumn=(100/(result.length+1));
                  var leftval=(i+1)*percolumn;
                  var widthval=percolumn;
                  var heightval=h+(no_slot*h);




                  // alert('j is '+j+', prev is '+prev_row +', and tot is '+result.length+1+' , leftval is '+leftval);
                  $('#emp'+result[i][j].worker_id+'-'+timeid).append("<div id='"+result[i][j].id+"-"+difference+"' class='allevents  draggable  ui-widget-content' style='height:"+heightval+"px;width:"+percolumn+"%;top:"+topval+"px;left:"+leftval+"%;'><p id='"+result[i][j].title+"' class='event-title'> "+result[i][j].title+"</p></div>");
                  

                   var rownum = parseInt(fetchNum($('#emp'+result[i][j].worker_id+'-'+timeid).data('value')));
                   //alert('index is '+$('#emp'+result[i][j].worker_id+'-'+timeid).index());
                   
                   //alert('row no is '+rownum+',no. of slots '+no_slot);
                   if(no_slot>1)
                   {
                   for(z=0;z<no_slot;z++)
                       {
                         $("[data-value~='"+result[i][j].worker_id+"-"+rownum+"']").droppable({accept:'#'+result[i][j].id+'-'+difference});
                       
                        // alert('for loop'+ $("[data-value~='4-9']").length);
                        rownum=rownum+1;
                      }
                   }

                  event_index=event_index+1;
               
                 $( ".draggable" ).draggable({  revert: 'invalid',  handle:'p'});
                 $( ".resizable" ).resizable();

                }

          }
  }});


}

dragObj = $('#timesheet td');
 $( '.ui-droppable' ).droppable({
   accept: '.draggable',
   greedy: true,
   tolerance: 'pointer',
   hoverClass:'accepting_drops',
  
      drop: function( event, ui ) {
    
       //alert('drop'+event.target.id);
       var appointment_div=$(ui.draggable).attr('id');
       //alert('appointments is '+appointment_div);
       var eventHeight=$(ui.draggable).height();
       var halfHeight= eventHeight/2;
       var back_rows=parseInt(halfHeight/slotHeight);

       //alert('Height is '+slotHeight);
     var app_id=getAppointmentIDFromRow(appointment_div);
     var app_diff=getDifferenceFromRow(appointment_div);
     updateEvent(getEmpIDFromRow(event.target.id),getTimeFromRow(event.target.id),app_id,app_diff);
      }
    });
function updateEvent(empid,utime,apid,app_diff)
{
//alert('emp id is '+empid+'time :'+utime+',ap id si '+apid+', and app diff is '+app_diff);
 var new_time=parseInt(getHour(utime));
 var new_mins=parseInt(getMinute(utime));

  
 var new_start_time_in_min=(new_time*60)+new_mins;
 var new_end_time_in_min= parseInt(new_start_time_in_min)+parseInt(app_diff);
//alert('new time hour is '+(new_end_time_in_min));
var end_hour=parseInt(new_end_time_in_min/60);
var end_mins=parseInt(new_end_time_in_min%60);
if(end_mins<10)
end_mins="0"+end_mins;
if(end_hour<10)
end_hour="0"+end_hour;
var new_end_hour=end_hour+':'+end_mins+':00';
var new_start_hour= utime.replace('-',':')+":00";
//alert('utime: '+new_start_hour+"new end hour "+new_end_hour);



$.ajax({
            type: "PUT",        
            url:"/appointments/"+apid,
            dataType: "JSON",
            data : {
            appointment: {
                worker_id: empid,
                start_time: "2000-01-01 "+new_start_hour,
                end_time: "2000-01-01 "+new_end_hour
                //description: ""
              }
            },
            success:function(result){
               clear_event();                
               renderCalendar();
            }

        });    
 }

$('#addevent').click(function(){
  alert('button click');
  $('#timesheet .contain_row').html("");
});

 $( "#appointment_form" ).submit(function( event ) {

});
});
function fetchNum(str)
{
var gotnum = str.substring(str.lastIndexOf("-")+1,str.length);
         return gotnum;
}
function getHour(str)
{
         //  alert('working on '+str);
          var gothour = str.substring(0, str.lastIndexOf("-"));
         return gothour;


}
function getMinute(str)
{
         //  alert('working on '+str);
        var gotmin = str.substring( str.lastIndexOf("-")+1 ,str.length);
        return gotmin;


}
function gettime(str)
{
                  //alert('working on '+str);
                  var last = str.substring(str.lastIndexOf("T") + 1, str.length);
                  var finale = last.substring(0, last.lastIndexOf(":"));
                  var got=finale.replace(':', '-');
                  return got;
    


}
function getTimeFromRow(str)
{
var getrowtime = str.substring(str.indexOf("-") + 1, str.length);
return getrowtime;

}
function getEmpIDFromRow(str)
{
 // alert('emp id '+str);
  var empfullid=str.substring(0,str.indexOf("-") );
  var empid=empfullid.substring(3,empfullid.length);
  return empid;

}
function getAppointmentIDFromRow(str)
{
var getrowtime = str.substring(0,str.indexOf("-"));
return getrowtime;

}
function getDifferenceFromRow(str)
{
var getrowtime = str.substring(str.indexOf("-") + 1, str.length);
return getrowtime;

}
function clear_event()
{
  $('#timesheet .contain_row').html(""); 
  $( '.ui-droppable' ).droppable({
   accept: '.draggable'});
 
}

$(document).on('click','.contain_row',function()
{
//alert('Add Event');
var empID=getEmpIDFromRow($(this).attr('id'));
$('#appointment_worker_id').val(empID);
  $('#myModal').modal('show');
});
$(document).on('mouseenter','.allevents',function()
{

$(this).css('z-index','100');
});
$(document).on('mouseleave','.allevents',function()
{

$(this).css('z-index','0');
});
