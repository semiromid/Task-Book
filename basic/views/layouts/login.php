<?php
use approot\classes\Sanitize;
?>
<!DOCTYPE html>
<html lang="<?php echo $this->lang; ?>">
    <head>
        <title>
            <?php echo Sanitize::html($this->title); ?>
        </title>
	    <meta charset="UTF-8">
	    <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <!-- 
            CSRF защита пока не реализована. Пока что нету свободного времени на реализацию.
        <meta name="csrf-param" content="_csrf">
        <meta name="csrf-token" content="">
        -->
        <?php echo $this->meta_tags; ?>
        <?php echo $this->links_head; ?>
        <?php echo $this->style; ?>

        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">

        <link rel="stylesheet" href="/media/build/css/login-min.css">
    </head>

            
    <body>


        <div>
	        <?php echo $view; ?>
        </div>



        <script src="/media/js/lib/jquery-3.5.1.min.js" defer></script>
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous" defer></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous" defer></script>
        <script src="/media/build/js/login-min.js" defer></script>

        <?php echo $this->scripts_body; ?>
    </body>
</html>