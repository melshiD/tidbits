<?php
require_once '../php/config.php';

$resources = json_decode(file_get_contents("resources.json"))->resources;
?>
<!DOCTYPE HTML>
<html lang="en">
<head>
    <title>Resources: Maternal Mortality & IPV ECHO</title>
    <?php include_head_tags(); ?>
    <?php include_framework_cs(); ?>
    <link rel='stylesheet' href='//cdn.datatables.net/1.10.19/css/jquery.dataTables.min.css'>
</head>
<body class="no-banner has-page-title landmarks">
<?php include_header();
include_main_menu(); ?>

<main role="main" class="wide" id="main">
    <?php //include_once 'side-menu.html'; ?>
    <div class="bg-none section collapsed" id="content">
        <div class="row">
            <div class="layout">
                <div class="text">
                    <h2>Resources</h2>
                    <p>Below are documents and websites relevant to Maternal Mortality Prevention and IPV.
                        The biweekly presentations can be downloaded in PDF format <a href="/schedule">on the Schedule page.</a></p>

                    <table id="resourceTable" class="table table-bordered table-striped">
                        <thead>
                        <tr>
                            <th>Title</th>
                            <th>Date</th>
                        </tr>
                        </thead>
                        <tbody>
                        <?php foreach ($resources as $resource) {
                            echo "<tr>
                                    <td><a href='$resource->url' target='_blank'>$resource->title</a></td>
                                    <td style='min-width: 90px'>$resource->date</td>
                                </tr>";
                        } ?>
                        </tbody>
                    </table>
                </div>
            </div><!-- /.layout -->
        </div><!-- row -->
    </div><!-- section -->
</main>

<?php include_footer();
include_mobile_menu();
include_framework_js(); ?>
<script src='//cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js'></script>
<script src='https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.22.2/moment.min.js' integrity='sha256-CutOzxCRucUsn6C6TcEYsauvvYilEniTXldPa6/wu0k=' crossorigin='anonymous'></script>
<script src='https://cdn.datatables.net/plug-ins/1.10.19/sorting/datetime-moment.js'></script>
<script>
    //enable sorting by date
    $.fn.dataTable.moment( 'MM-DD-YYYY' );

    $(function() {
        table = $('#resourceTable').DataTable({
            paging: false,
            searching: true,
            info: false,
            autoWidth: false,
            order: [[1, "desc"]]
        });
    });
</script>
</body>
</html>