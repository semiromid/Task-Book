const $edit_task__FORM=$("#edit_task__FORM"),$email__INPUT=$("#email__INPUT"),$user_name__INPUT=$("#user_name__INPUT"),$description__TEXTAR=$("#description__TEXTAR"),$task_submit__BUT=$("#task_submit__BUT");function sendRequest__PUT(){const e="http://"+window.location.hostname+"/api/task",_=$edit_task__FORM.attr("data-id");var t=$("#edit_task__FORM").serializeArray();t.push({name:"id",value:_}),$.ajax({type:"PUT",url:e,data:t}).done(function(e){if(null==e.error)return 200!=e.status?(console.log(e),void alert("Look log")):void(200===e.status&&(clearFields(),sendRequest__GET(number_page,sort_property,sort_type)));setError(e.error.property,e.error.message)}).fail(function(e){alert(e)})}function setError(e,_){$("#"+e).addClass("is-invalid"),$("#"+e).next().text(_)}function clearError(e){$(e).removeClass("is-invalid"),$(e).next().text("")}function clearFields(){$email__INPUT.val(""),$user_name__INPUT.val(""),$description__TEXTAR.val("")}function visableForm(e){clearError("#email__INPUT,#user_name__INPUT,#description__TEXTAR"),e?$edit_task__FORM.show():$edit_task__FORM.hide()}$task_submit__BUT.click(function(){sendRequest__PUT()}),$("#email__INPUT,#user_name__INPUT,#description__TEXTAR").on("input",function(e){clearError(e.target)});
const $right_table__index=$("#right_table__index"),$options_menu__BUT=$("#options_menu__BUT"),$form_check_input=$("#form-check-input"),$edit__BUT=$("#edit__BUT"),$done__BUT=$("#done__BUT");var number_page=1,sort_property="email",sort_type="ASC",arr_checked=[];function sendRequest__GET(t,e,a){const o="http://"+window.location.hostname+"/api/task",d={};d.number_page=t,d.sort_property=e,d.sort_type=a,$.get(o,d,function(o){number_page=t,setData(o.data.elements),setDataPagination(o.data.coutRows),setSort(e,a),clear_checkbox()})}function setData(t){var e="";Object.keys(t).forEach(function(a){e+=templateTable(t[a].id,t[a].email,t[a].user_name,t[a].description,t[a].status,t[a].status_last_edit)}),$(".table_data").remove(),$right_table__index.append(e),checkbox_Change(),updata_modal_onClick()}function templateTable(t,e,a,o,d,n){return d=0==d?"In process":"Done","<tr data-status_last_edit="+n+' class="table_data">'+("<td>"+templateCheckBox(t)+"</td>")+('<td data-toggle="modal" data-target="#exampleModal">'+escapeHtml(e)+"</td>")+('<td data-toggle="modal" data-target="#exampleModal">'+escapeHtml(a)+"</td>")+('<td data-toggle="modal" data-target="#exampleModal">'+d+"</td>")+('<td data-toggle="modal" data-target="#exampleModal">'+escapeHtml(o)+"</td>")+"</tr>"}function templateCheckBox(t){return'<div class="form-check">'+("<input data-id="+t+' type="checkbox" class="form-check-input">')+"</div>"}function checkbox_Change(){$(".form-check-input").change(function(){arr_checked=[],$(".form-check-input").each(function(t){!0===$(this).prop("checked")&&arr_checked.push($(this).attr("data-id"))});const t=arr_checked.length;0===t?($options_menu__BUT.prop("disabled",!0),visableForm(!1),$edit_task__FORM.attr("data-id","")):1===t?($options_menu__BUT.prop("disabled",!1),$edit__BUT.removeClass("disabled")):t>1&&($edit__BUT.addClass("disabled"),visableForm(!1),$edit_task__FORM.attr("data-id",""))})}function clear_checkbox(){arr_checked=[],$options_menu__BUT.prop("disabled",!0),$edit__BUT.removeClass("disabled"),visableForm(!1),$edit_task__FORM.attr("data-id","")}sendRequest__GET(number_page,sort_property,sort_type);var entityMap={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;","`":"&#x60;","=":"&#x3D;"};function escapeHtml(t){return String(t).replace(/[&<>"'`=\/]/g,function(t){return entityMap[t]})}var reentityMap={"&amp;":"&","&lt;":"<","&gt;":">","&quot;":'"',"&#39;":"'","&#x2F;":"/","&#x60;":"`","&#x3D;":"="};function reescapeHtml(t){return void 0===t?"":String(t).replace(/(&amp;|&lt;|&gt;|&quot;|&#39;|&#x2F;|&#x60;|&#x3D;)/g,function(t){return reentityMap[t]})}
function sendRequest__Status__PUT(){const t="http://"+window.location.hostname+"/api/task/status";var e={};e.id=arr_checked,e=JSON.stringify(e),$.ajax({type:"PUT",url:t,data:e}).done(function(t){console.log(t),200===t.status&&sendRequest__GET(number_page,sort_property,sort_type)}).fail(function(t){alert(t)})}function getFormData(t){var e="";return JSON.parse(JSON.stringify(t),function(t,n){""===e&&""!==t?e=encodeURIComponent(t)+"="+encodeURIComponent(n):""!==t&&(e=e+"&"+encodeURIComponent(t)+"="+encodeURIComponent(n))}),e}$done__BUT.click(function(t){visableForm(!1),$edit_task__FORM.attr("data-id",""),sendRequest__Status__PUT(arr_checked)});
function setDataForm(){$(".form-check-input").each(function(t){const e=$(this).attr("data-id");if(!0===$(this).prop("checked")&&e===arr_checked[0]){const t=$(this).parent().parent(),a=t.next().text(),n=t.next().next().text(),c=t.next().next().next().next().text();$edit_task__FORM.attr("data-id",e),$email__INPUT.val(reescapeHtml(a)),$user_name__INPUT.val(reescapeHtml(n)),$description__TEXTAR.val(reescapeHtml(c))}})}$edit__BUT.click(function(t){visableForm(!0),setDataForm()});
const $modal__email=$("#modal__email"),$modal__Username=$("#modal__Username"),$modal__Status=$("#modal__Status"),$modal__Description=$("#modal__Description"),$modal__edit_status=$("#modal__edit_status");function updata_modal_onClick(){$(".table_data").click(function(t){const a=$(this).attr("data-status_last_edit");email=$(this).children("td").eq(1).text(),username=$(this).children("td").eq(2).text(),status=$(this).children("td").eq(3).text(),description=$(this).children("td").eq(4).text(),$modal__email.text(email),$modal__Username.text(username),$modal__Status.text(status),$modal__Description.text(description),1==a?$modal__edit_status.show():$modal__edit_status.hide()})}
const $pagination_left__LI=$("#pagination_left__LI"),$pagination_right__LI=$("#pagination_right__LI"),$pagination_1__LI=$("#pagination_1__LI"),$pagination_2__LI=$("#pagination_2__LI"),$pagination_3__LI=$("#pagination_3__LI");function setDataPagination(a){const i=Math.ceil(a/3),n=state_pagination(number_page,a);tunrON_pagination_left(n,parseInt(number_page),i),tunrON_pagination_right(n,parseInt(number_page),i),tunrON_pagination_1(n,parseInt(number_page),i),tunrON_pagination_2(n,parseInt(number_page),i),tunrON_pagination_3(n,parseInt(number_page),i)}const $els_pagination="#pagination_1__LI,#pagination_2__LI,#pagination_3__LI,#pagination_left__LI,#pagination_right__LI";function state_pagination(a,i){const n=Math.ceil(i/3);if(1==a)return"state-1";if(a>1){if(n==a&&n<3)return"state-2-end";if(n!=a&&n>2)return"state-2";if(n==a&&n>=3)return"state-3"}}function tunrON_pagination_left(a,i,n){n>1?$pagination_left__LI.show():$pagination_left__LI.hide(),i>3?($pagination_left__LI.removeClass("disabled"),$pagination_left__LI.removeClass("pagination_disabled__index")):($pagination_left__LI.addClass("disabled"),$pagination_left__LI.addClass("pagination_disabled__index"))}function tunrON_pagination_right(a,i,n){n>1?$pagination_right__LI.show():$pagination_right__LI.hide(),n>3&&n-1>i?($pagination_right__LI.attr("data-page",n),$pagination_right__LI.removeClass("disabled"),$pagination_right__LI.removeClass("pagination_disabled__index")):($pagination_right__LI.addClass("disabled"),$pagination_right__LI.addClass("pagination_disabled__index"))}function tunrON_pagination_1(a,i,n){if(n<2)return $pagination_1__LI.children().text("1"),$pagination_1__LI.attr("data-page","1"),$pagination_1__LI.addClass("pagination_hidden"),void $pagination_1__LI.removeClass("paginator_active");"state-1"==a?$pagination_1__LI.addClass("paginator_active"):"state-2"==a||"state-2-end"==a?($pagination_1__LI.removeClass("paginator_active"),i-=1):"state-3"==a&&($pagination_1__LI.removeClass("paginator_active"),i-=2),$pagination_1__LI.removeClass("pagination_hidden"),$pagination_1__LI.attr("data-page",i),$pagination_1__LI.children().text(i)}function tunrON_pagination_2(a,i,n){if(n<2)return $pagination_2__LI.removeClass("paginator_active"),$pagination_2__LI.children().text("2"),$pagination_2__LI.attr("data-page","2"),void $pagination_2__LI.addClass("pagination_hidden");"state-1"==a?(i++,$pagination_2__LI.removeClass("paginator_active")):"state-2"==a||"state-2-end"==a?$pagination_2__LI.addClass("paginator_active"):"state-3"==a&&($pagination_2__LI.removeClass("paginator_active"),i-=1),$pagination_2__LI.removeClass("pagination_hidden"),$pagination_2__LI.attr("data-page",i),$pagination_2__LI.children().text(i)}function tunrON_pagination_3(a,i,n){if(n<3)return $pagination_3__LI.removeClass("paginator_active"),$pagination_3__LI.children().text("2"),$pagination_3__LI.attr("data-page","2"),void $pagination_3__LI.addClass("pagination_hidden");"state-1"==a?(i+=2,$pagination_3__LI.removeClass("paginator_active")):"state-2"==a?($pagination_3__LI.removeClass("paginator_active"),i+=1):"state-3"==a&&$pagination_3__LI.addClass("paginator_active"),$pagination_3__LI.removeClass("pagination_hidden"),$pagination_3__LI.attr("data-page",i),$pagination_3__LI.children().text(i)}$($els_pagination).click(function(a){const i=$(this).attr("data-page");sendRequest__GET(i,sort_property,sort_type)});
const $sort_con=$(".sort_con");var $sort_email=$("#sort_email"),$sort_username=$("#sort_username"),$sort_status=$("#sort_status");function setSort(s,t){let r;sort_property=s,sort_type=t,"email"==sort_property?(r=$sort_email,$sort_username.children().removeClass("sort-active"),$sort_status.children().removeClass("sort-active")):"user_name"==sort_property?(r=$sort_username,$sort_email.children().removeClass("sort-active"),$sort_status.children().removeClass("sort-active")):"status"==sort_property&&(r=$sort_status,$sort_email.children().removeClass("sort-active"),$sort_username.children().removeClass("sort-active")),r.children().addClass("sort-active"),"DESC"==sort_type?(r.children().removeClass("sort-by-asc"),r.children().addClass("sort-by-desc")):(r.children().removeClass("sort-by-desc"),r.children().addClass("sort-by-asc"))}$sort_email.children().addClass("sort-active"),$sort_email.click(function(s){"DESC"==sort_type?sort_t="ASC":sort_t="DESC",sendRequest__GET(number_page,"email",sort_t)}),$sort_username.click(function(s){"DESC"==sort_type?sort_t="ASC":sort_t="DESC",sendRequest__GET(number_page,"user_name",sort_t)}),$sort_status.click(function(s){"DESC"==sort_type?sort_t="ASC":sort_t="DESC",sendRequest__GET(number_page,"status",sort_t)});