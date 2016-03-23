<div class="row border-bottom">
    <nav class="navbar navbar-static-top" role="navigation">
        <div class="navbar-header">
            <button aria-controls="navbar" aria-expanded="false" data-target="#navbar" data-toggle="collapse" class="navbar-toggle collapsed" type="button">
            <i class="fa fa-reorder"></i>
            </button>
            <a href="index.php" class="navbar-brand">TDB</a>
        </div>
        <div class="navbar-collapse collapse" id="navbar">
            <ul class="nav navbar-nav">
                <li>
                    <form role="search" class="navbar-form-custom" action="search_results.html">
                        <div class="form-group">
                            <input type="text" placeholder="Search for something..." class="form-control" name="top-search" id="top-search">
                        </div>
                    </form>
                </li>
                <li>
                    <li>
                        <a href="technologyDashboard.php"><i class="fa fa-database"></i> <span class="nav-label">Technologies</span></a>
                    </li>
                    <li>
                        <a href="/projects"><i class="fa fa-folder"></i> <span class="nav-label">Projects</span></a>
                    </li>
                    <li>
                        <a href="/organizations"><i class="fa fa-building"></i> <span class="nav-label">Organizations</span></a>
                    </li>
                    <li>
                        <a href="/attachments"><i class="fa fa-paperclip"></i> <span class="nav-label">Attachments</span></a>
                    </li>
                    <li class="dropdown">
                        <a aria-expanded="false" role="button" href="#" class="dropdown-toggle" data-toggle="dropdown"> Views <span class="caret"></span></a>
                        <ul role="menu" class="dropdown-menu">
                            <li><a href="projectCollections.php">projectCollections</a></li>
                            <li><a href="projectEntry.php">projectEntry</a></li>
                            <li><a href="organizationEntry.php">organizationEntry</a></li>
                        </ul>
                    </li>
                    <li class="dropdown">
                        <a aria-expanded="false" role="button" href="#" class="dropdown-toggle" data-toggle="dropdown"> Elements <span class="caret"></span></a>
                        <ul role="menu" class="dropdown-menu">
                            <li class="active"><a href="cards.php">Cards</a></li>
                        </ul>
                    </li>
                </ul>
                <ul class="nav navbar-top-links navbar-right">
                    <li>
                        <a href="usersDashboard.php">
                            <span class="fa fa-users"></span>
                        </a>
                    </li>
                    <li>
                        <span class="m-r-sm text-muted welcome-message">Arthur Soares</span>
                    </li>
                    <li>
                        <a href="login.html"><span class="fa fa-sign-out"></span></a>
                    </li>
                </ul>
            </div>
        </nav>
    </div>