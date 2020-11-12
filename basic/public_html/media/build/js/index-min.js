const $email__INPUT=$("#email__INPUT"),$user_name__INPUT=$("#user_name__INPUT"),$description__TEXTAR=$("#description__TEXTAR"),$task_submit__BUT=$("#task_submit__BUT");function sendRequest__POST(){const e="http://"+window.location.hostname+"/api/task";var _=$("#create_task__FORM").serializeArray();$.post(e,_,function(e){null!=e.error?setError(e.error.property,e.error.message):(clearFields(),sendRequest__GET(number_page,sort_property,sort_type))})}function setError(e,_){$("#"+e).addClass("is-invalid"),$("#"+e).next().text(_)}function clearError(e){$(e).removeClass("is-invalid"),$(e).next().text("")}function clearFields(){$email__INPUT.val(""),$user_name__INPUT.val(""),$description__TEXTAR.val("")}$task_submit__BUT.click(function(){sendRequest__POST()}),$("#email__INPUT,#user_name__INPUT,#description__TEXTAR").on("input",function(e){clearError(e.target)});
const $right_table__index=$("#right_table__index");var number_page=1,sort_property="email",sort_type="ASC";function sendRequest__GET(t,e,a){const n="http://"+window.location.hostname+"/api/task",r={};r.number_page=t,r.sort_property=e,r.sort_type=a,$.get(n,r,function(n){number_page=t,setData(n.data.elements),setDataPagination(n.data.coutRows),setSort(e,a),updata_modal_onClick()})}function setData(t){var e="";Object.keys(t).forEach(function(a){e+=templateTable(t[a].email,t[a].user_name,t[a].description,t[a].status,t[a].status_last_edit)}),$(".table_data").remove(),$right_table__index.append(e)}function templateTable(t,e,a,n,r){return"<tr data-status_last_edit="+r+' data-toggle="modal" data-target="#exampleModal" class="table_data"><td>'+escapeHtml(t)+"</td><td>"+escapeHtml(e)+"</td><td>"+(n=0==n?"In process":"Done")+"</td><td>"+escapeHtml(a)+"</td></tr>"}sendRequest__GET(number_page,sort_property,sort_type);var entityMap={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;","`":"&#x60;","=":"&#x3D;"};function escapeHtml(t){return String(t).replace(/[&<>"'`=\/]/g,function(t){return entityMap[t]})}
const $modal__email=$("#modal__email"),$modal__Username=$("#modal__Username"),$modal__Status=$("#modal__Status"),$modal__Description=$("#modal__Description"),$modal__edit_status=$("#modal__edit_status");function updata_modal_onClick(){$(".table_data").click(function(t){const a=$(this).attr("data-status_last_edit");email=$(this).children("td").eq(0).text(),username=$(this).children("td").eq(1).text(),status=$(this).children("td").eq(2).text(),description=$(this).children("td").eq(3).text(),$modal__email.text(email),$modal__Username.text(username),$modal__Status.text(status),$modal__Description.text(description),1==a?$modal__edit_status.show():$modal__edit_status.hide()})}
const $pagination_left__LI=$("#pagination_left__LI"),$pagination_right__LI=$("#pagination_right__LI"),$pagination_1__LI=$("#pagination_1__LI"),$pagination_2__LI=$("#pagination_2__LI"),$pagination_3__LI=$("#pagination_3__LI");function setDataPagination(a){const i=Math.ceil(a/3),n=state_pagination(number_page,a);tunrON_pagination_left(n,parseInt(number_page),i),tunrON_pagination_right(n,parseInt(number_page),i),tunrON_pagination_1(n,parseInt(number_page),i),tunrON_pagination_2(n,parseInt(number_page),i),tunrON_pagination_3(n,parseInt(number_page),i)}const $els_pagination="#pagination_1__LI,#pagination_2__LI,#pagination_3__LI,#pagination_left__LI,#pagination_right__LI";function state_pagination(a,i){const n=Math.ceil(i/3);if(1==a)return"state-1";if(a>1){if(n==a&&n<3)return"state-2-end";if(n!=a&&n>2)return"state-2";if(n==a&&n>=3)return"state-3"}}function tunrON_pagination_left(a,i,n){n>1?$pagination_left__LI.show():$pagination_left__LI.hide(),i>3?($pagination_left__LI.removeClass("disabled"),$pagination_left__LI.removeClass("pagination_disabled__index")):($pagination_left__LI.addClass("disabled"),$pagination_left__LI.addClass("pagination_disabled__index"))}function tunrON_pagination_right(a,i,n){n>1?$pagination_right__LI.show():$pagination_right__LI.hide(),n>3&&n-1>i?($pagination_right__LI.attr("data-page",n),$pagination_right__LI.removeClass("disabled"),$pagination_right__LI.removeClass("pagination_disabled__index")):($pagination_right__LI.addClass("disabled"),$pagination_right__LI.addClass("pagination_disabled__index"))}function tunrON_pagination_1(a,i,n){if(n<2)return $pagination_1__LI.children().text("1"),$pagination_1__LI.attr("data-page","1"),$pagination_1__LI.addClass("pagination_hidden"),void $pagination_1__LI.removeClass("paginator_active");"state-1"==a?$pagination_1__LI.addClass("paginator_active"):"state-2"==a||"state-2-end"==a?($pagination_1__LI.removeClass("paginator_active"),i-=1):"state-3"==a&&($pagination_1__LI.removeClass("paginator_active"),i-=2),$pagination_1__LI.removeClass("pagination_hidden"),$pagination_1__LI.attr("data-page",i),$pagination_1__LI.children().text(i)}function tunrON_pagination_2(a,i,n){if(n<2)return $pagination_2__LI.removeClass("paginator_active"),$pagination_2__LI.children().text("2"),$pagination_2__LI.attr("data-page","2"),void $pagination_2__LI.addClass("pagination_hidden");"state-1"==a?(i++,$pagination_2__LI.removeClass("paginator_active")):"state-2"==a||"state-2-end"==a?$pagination_2__LI.addClass("paginator_active"):"state-3"==a&&($pagination_2__LI.removeClass("paginator_active"),i-=1),$pagination_2__LI.removeClass("pagination_hidden"),$pagination_2__LI.attr("data-page",i),$pagination_2__LI.children().text(i)}function tunrON_pagination_3(a,i,n){if(n<3)return $pagination_3__LI.removeClass("paginator_active"),$pagination_3__LI.children().text("2"),$pagination_3__LI.attr("data-page","2"),void $pagination_3__LI.addClass("pagination_hidden");"state-1"==a?(i+=2,$pagination_3__LI.removeClass("paginator_active")):"state-2"==a?($pagination_3__LI.removeClass("paginator_active"),i+=1):"state-3"==a&&$pagination_3__LI.addClass("paginator_active"),$pagination_3__LI.removeClass("pagination_hidden"),$pagination_3__LI.attr("data-page",i),$pagination_3__LI.children().text(i)}$($els_pagination).click(function(a){const i=$(this).attr("data-page");sendRequest__GET(i,sort_property,sort_type)});
const $sort_con=$(".sort_con");var $sort_email=$("#sort_email"),$sort_username=$("#sort_username"),$sort_status=$("#sort_status");function setSort(s,t){let r;sort_property=s,sort_type=t,"email"==sort_property?(r=$sort_email,$sort_username.children().removeClass("sort-active"),$sort_status.children().removeClass("sort-active")):"user_name"==sort_property?(r=$sort_username,$sort_email.children().removeClass("sort-active"),$sort_status.children().removeClass("sort-active")):"status"==sort_property&&(r=$sort_status,$sort_email.children().removeClass("sort-active"),$sort_username.children().removeClass("sort-active")),r.children().addClass("sort-active"),"DESC"==sort_type?(r.children().removeClass("sort-by-asc"),r.children().addClass("sort-by-desc")):(r.children().removeClass("sort-by-desc"),r.children().addClass("sort-by-asc"))}$sort_email.children().addClass("sort-active"),$sort_email.click(function(s){"DESC"==sort_type?sort_t="ASC":sort_t="DESC",sendRequest__GET(number_page,"email",sort_t)}),$sort_username.click(function(s){"DESC"==sort_type?sort_t="ASC":sort_t="DESC",sendRequest__GET(number_page,"user_name",sort_t)}),$sort_status.click(function(s){"DESC"==sort_type?sort_t="ASC":sort_t="DESC",sendRequest__GET(number_page,"status",sort_t)});