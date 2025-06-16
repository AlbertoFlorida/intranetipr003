<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use Doctrine\ORM\Mapping as ORM;

#[ApiResource(
    shortName: 'Preformado de componentes',
    operations: [
        new Get(uriTemplate: '/preformado/{cod}'),
        new GetCollection(uriTemplate: '/preformado')
    ],
    paginationEnabled: false
)]
#[ORM\Entity]
#[ORM\Table(name: "GAARTDESCR")]
class Preformado
{
    #[ORM\Id]
    #[ORM\Column(name: "GAART_COD", type: "string", length: 20)]
    public string $cod;

    #[ORM\Column(name: "DESCRIP", type: "text", nullable: true)]
    public ?string $descrip = null;
}
