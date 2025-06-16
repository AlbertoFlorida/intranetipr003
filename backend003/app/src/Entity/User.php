<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Delete;

#[ApiResource(
    normalizationContext: ['groups' => ['user:read']],
    denormalizationContext: ['groups' => ['user:write']],
    operations: [
        new GetCollection(security: "is_granted('ROLE_ADMIN')", openapi: false),
        new Get(security: "is_granted('ROLE_ADMIN')", openapi: false),
        new Post(security: "is_granted('ROLE_ADMIN')", openapi: false),
        new Put(security: "is_granted('ROLE_ADMIN')", openapi: false),
        new Delete(security: "is_granted('ROLE_ADMIN')", openapi: false),
    ]
)]


#[ORM\Entity]
#[ORM\Table(name: "FRMX_INTRANETIPR_USER")]
#[UniqueEntity(fields: ['usuario'], message: 'Este nombre de usuario ya está en uso')]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\Column(length: 100, unique: true)]
    #[Groups(['user:read', 'user:write'])]
    private ?string $usuario = null;

    #[ORM\Column(length: 180)]
    #[Groups(['user:read', 'user:write'])]
    #[Assert\Email]
    private string $email;

    #[ORM\Column(type: "json")]
    #[Groups(['user:read', 'user:write'])]
    private array $roles = [];

    #[ORM\Column(nullable: true)]
    #[Groups(['user:create', 'user:write'])]
    #[Assert\NotBlank(groups: ['user:create'])]
    private ?string $password = null;

    public function getUsuario(): ?string
    {
        return $this->usuario;
    }

    public function setUsuario(string $usuario): self
    {
        $this->usuario = $usuario;
        return $this;
    }

    public function getUserIdentifier(): string
    {
        return $this->usuario ?? '';
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;
        return $this;
    }

    public function getRoles(): array
    {
        $roles = $this->roles;

        if (!in_array('ROLE_USER', $roles)) {
            $roles[] = 'ROLE_USER';
        }

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;
        return $this;
    }

    public function getPassword(): string
    {
        return $this->password ?? '';
    }

    public function setPassword(?string $password): self
    {
        if ($password === null || trim($password) === '') {
            return $this;
        }

        $this->password = $password;
        return $this;
    }

    public function eraseCredentials(): void {}
}
