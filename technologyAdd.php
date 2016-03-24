<!-- HEADER HTML -->
<?php include "header.php" ?>
<!-- SIDE BAR MENU NAVIGATION -->
<?php include "navbar.php" ?>
<!-- Page wrapper -->
<!-- Page wrapper -->
<div class="row border-bottom white-bg page-heading">
    <div class="col-lg-12">
        <ol class="breadcrumb">
            <li>
                Views
            </li>
            <li class="active">
                <strong>technologyAdd</strong>
            </li>
        </ol>
    </div>
</div>
<div class="wrapper wrapper-content">
    <div class="row">
        <div class="col-lg-3">
            <div style="position: fixed; width: 20%;">
                <div class="row">
                    <?php include "elements/technologyCard_add.php" ?>
                </div>
                <!-- STATUS -->
                <!--  <div class="row">
                    <div class="ibox">
                        <div class="ibox-content">
                            <form id="quickEdit" novalidate="novalidate">
                                <div class="form-group" data-required="true">
                                    <label>Status</label>
                                    <fieldset>
                                        <div class="radio radio-danger radio-inline">
                                            <input type="radio" id="inlineRadio1" value="option1" name="radioInline" checked="">
                                            <label for="inlineRadio1">Draft </label>
                                        </div>
                                        <div class="radio radio-warning radio-inline">
                                            <input type="radio" id="inlineRadio1" value="option1" name="radioInline" checked checked="">
                                            <label for="inlineRadio1">Review</label>
                                        </div>
                                        <div class="radio radio-primary radio-inline">
                                            <input type="radio" id="inlineRadio2" value="option2" name="radioInline">
                                            <label for="inlineRadio2">Published</label>
                                        </div>
                                    </fieldset>
                                </div>
                            </form>
                            <p>
                                <div class="btn-group">

                                    <button type="button" class="btn btn-sm btn-primary">Add technology</button>
                                    <button type="button" class="btn btn-sm btn-outline btn-primary">Cancel</button>
                                </div>
                            </p>
                        </div>
                    </div>
                </div> -->
            </div>
        </div>
        <div class="col-lg-9">
            <form id="insertTechnologiesForm" class="form-horizontal" novalidate="novalidate">
                <div class="row">
                    <div class="ibox">
                        <div class="ibox-title">
                            <h3>Basic Information</h3>
                        </div>
                        <div class="ibox-content">
                            <div class="form-group" data-required="true">
                                <label class="col-sm-2 control-label" for="22aphY63CBfWzzHPD">Title</label>
                                <div class="col-sm-9">
                                    <input type="text" name="name" id="22aphY63CBfWzzHPD" required="" data-schema-key="name" placeholder="Drone Delivery" class="form-control">
                                    <p class="help-block m-b-none">
                                        <ol>
                                            <li>Use "Title Case": <i>Capitalize All Important Words</i>.</li>
                                            <li>Avoid plural titles: <i>"Solar Panels", "Self-driving Vehicles"</i></li>
                                            <li>Avoid empty words: <i>"Smart Car", "Next-gen Keychain", "Health 3.0"</i></li>
                                            <li>Avoid product names: <i>"Powerwall" → "Wall-mounted Household Battery"</i></li>
                                        </ol>
                                    </p>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label" for="PEPBMoTKtRQ8yfkDo">Alternative titles</label>
                                <div class="col-sm-9">
                                    <div class="autoform-tags-field">
                                        <input type="text" name="name" id="22aphY63CBfWzzHPD" required="" data-schema-key="name" class="form-control">
                                        <span class="help-block m-b-none">These are alternate names for this technology. They will be accessible via search.</span>
                                        <div class="bootstrap-tagsinput" style="margin-top:-49px; margin-bottom:25px; margin-left:8px;">
                                            <span class="tag label label-primary">Deliver Bot<span data-role="remove"></span></span>
                                            <span class="tag label label-primary">Payload Drone<span data-role="remove"></span> </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group" data-required="true">
                                <label class="col-sm-2 control-label" for="22aphY63CBfWzzHPD">Image</label>
                                <div class="col-sm-9">
                                    <img src="img/add_image.jpg" class="img-responsive" />
                                    <p class="help-block m-b-none">
                                        Remember to use images that are descriptive & noteworthy. Photographs are always better than illustrations. Concept Renderings are fine.
                                    </p>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label" for="PEPBMoTKtRQ8yfkDo">Tags</label>
                                <div class="col-sm-9">
                                    <div class="autoform-tags-field">
                                        <input type="text" name="name" id="22aphY63CBfWzzHPD" required="" data-schema-key="name" class="form-control">
                                        <span class="help-block m-b-none">These will be used to correlate with other technologies.</span>
                                        <div class="bootstrap-tagsinput" style="margin-top:-49px; margin-bottom:25px; margin-left:8px;">
                                            <span class="tag label label-primary">Drone<span data-role="remove"></span></span>
                                            <span class="tag label label-primary">UAV<span data-role="remove"></span></span>
                                            <span class="tag label label-primary">Air<span data-role="remove"></span></span>
                                            <span class="tag label label-primary">Automation<span data-role="remove"></span></span>
                                            <span class="tag label label-primary">Artificial Intelligence<span data-role="remove"></span></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="ibox">
                        <div class="ibox-content">
                            <div class="form-group">
                                <label class="col-sm-2 control-label">Summary</label>
                                <div class="col-sm-9">
                                    <textarea class="form-control" style="resize: none;" rows="2" placeholder="Relatively cheap drones with advanced sensors and imaging capabilities are giving farmers new ways to increase yields and reduce crop damage"></textarea>
                                    <span style="display: inline-block;text-align: right; position: absolute; right: 20px; font-size: 10px; margin-top: -17px;">0 / 140</span>
                                    <p class="help-block m-b-none">This description will be used in the cards inside TDB and FutureKit. It has a 140 characters limit.</p>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">Description</label>
                                <div class="col-sm-9">
                                    <img src="img/gfm.jpg" class="img-responsive" />
                                    <p class="help-block m-b-none">Avoid starting description with technology Title. Try keeping description to ±3 sentences, highlighting: <i>Technical (What is it?)</i>, <i>Relevance (What does it do?)</i> & <i>Importance (Why does is matter?)</i>.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="ibox float-e-margins">
                        <div class="ibox-title">
                            <h1>
                            <i class="fa fa-paperclip"></i>
                            Organizations
                            </h1>
                            <div class="ibox-tools">
                                <a href="#" id="manage-org-attachments">
                                    <i class="fa fa-plus"></i>
                                </a>
                            </div>
                        </div>
                        <div class="ibox-content">
                            <div class="row cards-box cards-responsive">
                                <div class="cards-size"></div>
                                <?php include "elements/organizationCard.php" ?>
                                <?php include "elements/organizationCard.php" ?>
                                <?php include "elements/organizationCard.php" ?>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- INICIO Projects -->
                <div class="row">
                    <div class="ibox float-e-margins">
                        <div class="ibox-title">
                            <h1>
                            <i class="fa fa-folder"></i>
                            Projects
                            </h1>
                            <div class="ibox-tools">
                                <a href="#" id="manage-org-projects">
                                    <i class="fa fa-plus"></i>
                                </a>
                            </div>
                        </div>
                        <div class="ibox-content">
                            <div class="row cards-box cards-responsive">
                                <div class="cards-size"></div>
                                <?php include "elements/projectCard.php" ?>
                                <?php include "elements/projectCard.php" ?>
                                <?php include "elements/projectCard.php" ?>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="ibox float-e-margins">
                        <div class="ibox-title">
                            <h1>
                            <i class="fa fa-paperclip"></i>
                            Attachments
                            </h1>
                            <div class="ibox-tools">
                                <a href="#" id="manage-org-attachments">
                                    <i class="fa fa-plus"></i>
                                </a>
                            </div>
                        </div>
                        <div class="ibox-content">
                            <div class="row cards-box cards-responsive">
                                <div class="cards-size"></div>
                                <?php include "elements/attachmentCard.php" ?>
                                <?php include "elements/attachmentCard.php" ?>
                                <?php include "elements/attachmentCard.php" ?>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    </div>
</div>
<?php include "footer.php" ?>
