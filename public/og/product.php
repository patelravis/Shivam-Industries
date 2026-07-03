<?php
/**
 * Open Graph HTML for social crawlers (WhatsApp, Facebook, LinkedIn).
 * Apache .htaccess routes bot user-agents here for /product/:slug URLs.
 */
header('Content-Type: text/html; charset=utf-8');

$slug = preg_replace('/[^a-z0-9-]/', '', $_GET['slug'] ?? '');
$siteUrl = getenv('SITE_URL') ?: 'https://shivamindustries.in';
$metaFile = dirname(__DIR__) . '/products-meta.json';

$product = null;
if (file_exists($metaFile)) {
    $all = json_decode(file_get_contents($metaFile), true);
    foreach ($all as $item) {
        if ($item['slug'] === $slug) {
            $product = $item;
            break;
        }
    }
}

if (!$product) {
    http_response_code(404);
    echo '<!DOCTYPE html><html><head><title>Product Not Found</title></head><body><p>Product not found.</p></body></html>';
    exit;
}

$title = htmlspecialchars($product['name'] . ' | Shivam Industries', ENT_QUOTES, 'UTF-8');
$desc = htmlspecialchars($product['description'], ENT_QUOTES, 'UTF-8');
$image = htmlspecialchars($product['image'], ENT_QUOTES, 'UTF-8');
$url = htmlspecialchars($product['url'], ENT_QUOTES, 'UTF-8');
$redirect = htmlspecialchars('/product/' . $slug, ENT_QUOTES, 'UTF-8');
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title><?= $title ?></title>
  <meta name="description" content="<?= $desc ?>" />
  <meta property="og:site_name" content="Shivam Industries" />
  <meta property="og:title" content="<?= $title ?>" />
  <meta property="og:description" content="<?= $desc ?>" />
  <meta property="og:type" content="product" />
  <meta property="og:url" content="<?= $url ?>" />
  <meta property="og:image" content="<?= $image ?>" />
  <meta property="og:image:secure_url" content="<?= $image ?>" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="<?= $title ?>" />
  <meta name="twitter:description" content="<?= $desc ?>" />
  <meta name="twitter:image" content="<?= $image ?>" />
  <meta http-equiv="refresh" content="0;url=<?= $redirect ?>" />
  <link rel="canonical" href="<?= $url ?>" />
</head>
<body>
  <p>Redirecting to <a href="<?= $redirect ?>"><?= $title ?></a></p>
</body>
</html>
